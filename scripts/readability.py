#!/usr/bin/env python3
"""Readability metrics for a blog-post draft.

Strips HTML, drops figures/tables (not prose), then reports Flesch Reading Ease,
Flesch-Kincaid grade, Gunning Fog, and the Hemingway-style signals: over-long
sentences, adverbs, and passive constructions. Prints the worst offenders so
they can actually be fixed.

    python3 scripts/readability.py content/blog/some-post.html
"""

from __future__ import annotations

import html
import re
import sys
from dataclasses import dataclass, field

# Sentences longer than this are hard to read; longer than VERY_LONG, very hard.
LONG_SENTENCE = 25
VERY_LONG_SENTENCE = 35

BE_VERBS = r"(?:is|are|was|were|be|been|being|am|get|gets|got)"
# Past participles: regular -ed plus the irregulars that show up in technical prose.
IRREGULAR_PARTICIPLES = (
    "written|built|made|given|taken|shown|known|done|held|kept|left|sent|"
    "run|read|found|told|brought|thought|caught|bought|taught|drawn|chosen|"
    "driven|broken|spoken|forgotten|hidden|lost|meant|paid|put|set|split|cut"
)
PASSIVE = re.compile(
    rf"\b{BE_VERBS}\b\s+(?:\w+ly\s+)?(?:\w+ed|{IRREGULAR_PARTICIPLES})\b", re.I
)

# -ly words that are adjectives or otherwise not the adverbs Hemingway means.
NOT_ADVERBS = {
    "only", "early", "family", "likely", "unlikely", "friendly", "daily",
    "weekly", "monthly", "yearly", "ugly", "silly", "supply", "reply",
    "apply", "rely", "assembly", "anomaly",
}

BLOCK_TAGS = ("p", "li", "h1", "h2", "h3", "h4", "blockquote")

# A block end is a hard sentence break. Using ". " instead loses list items whose
# next item starts lowercase ("deepagents", "pi", "smolagents"), because the split
# below needs a capital; two items then merge into one phantom long sentence.
BLOCK_BREAK = "\u2029"


def extract_prose(source: str) -> str:
    """Return only the prose: no code, no figures, no tables, no attributes."""
    body = source
    # Everything that is not prose, dropped whole.
    for pattern in (
        r"<pre\b.*?</pre>",
        r"<figure\b.*?</figure>",
        r"<table\b.*?</table>",
        r"<svg\b.*?</svg>",
        r"<script\b.*?</script>",
        r"<style\b.*?</style>",
        r"<summary\b.*?</summary>",          # disclosure labels are UI, not prose
        r"<li>\s*<a\b[^>]*>[^<]*</a>\s*</li>",  # further-reading lists are citations
    ):
        body = re.sub(pattern, " ", body, flags=re.S | re.I)

    # Keep block boundaries so sentences do not run together across tags.
    for tag in BLOCK_TAGS:
        body = re.sub(rf"</{tag}\s*>", f" {BLOCK_BREAK} ", body, flags=re.I)

    body = re.sub(r"<[^>]+>", " ", body)
    body = html.unescape(body)
    body = body.replace(" ", " ")
    body = re.sub(r"\s+", " ", body)
    return body.strip()


def split_sentences(text: str) -> list[str]:
    parts = []
    for block in text.split(BLOCK_BREAK):
        parts += re.split(r"(?<=[.!?])\s+(?=[A-Z\"'(])", block)
    return [p.strip() for p in parts if len(p.strip().split()) >= 3]


def words_of(text: str) -> list[str]:
    return re.findall(r"[A-Za-z][A-Za-z'-]*", text)


def syllables(word: str) -> int:
    """Heuristic syllable count. Good enough for aggregate readability scores."""
    w = word.lower().strip("'-")
    if not w:
        return 0
    if len(w) <= 3:
        return 1
    w = re.sub(r"(?:[^laeiouy]es|ed|[^laeiouy]e)$", "", w)
    w = re.sub(r"^y", "", w)
    count = len(re.findall(r"[aeiouy]{1,2}", w))
    return max(1, count)


def is_complex(word: str) -> bool:
    """Gunning Fog complex word: 3+ syllables, excluding easy inflections."""
    if word[:1].isupper():
        return False
    base = re.sub(r"(es|ed|ing)$", "", word.lower())
    return syllables(base) >= 3


@dataclass
class Report:
    words: int = 0
    sentences: int = 0
    syllables: int = 0
    complex_words: int = 0
    long: list[tuple[int, str]] = field(default_factory=list)
    adverbs: list[str] = field(default_factory=list)
    passives: list[tuple[str, str]] = field(default_factory=list)

    @property
    def wps(self) -> float:
        return self.words / max(1, self.sentences)

    @property
    def spw(self) -> float:
        return self.syllables / max(1, self.words)

    @property
    def flesch(self) -> float:
        return 206.835 - 1.015 * self.wps - 84.6 * self.spw

    @property
    def fk_grade(self) -> float:
        return 0.39 * self.wps + 11.8 * self.spw - 15.59

    @property
    def fog(self) -> float:
        return 0.4 * (self.wps + 100 * self.complex_words / max(1, self.words))


def analyse(prose: str) -> Report:
    r = Report()
    for sentence in split_sentences(prose):
        r.sentences += 1
        ws = words_of(sentence)
        r.words += len(ws)
        r.syllables += sum(syllables(w) for w in ws)
        r.complex_words += sum(1 for w in ws if is_complex(w))

        if len(ws) > LONG_SENTENCE:
            r.long.append((len(ws), sentence))
        for w in ws:
            lw = w.lower()
            if lw.endswith("ly") and lw not in NOT_ADVERBS and len(lw) > 4:
                r.adverbs.append(w)
        for m in PASSIVE.finditer(sentence):
            r.passives.append((m.group(0), sentence))
    return r


def vocabulary_floor(prose: str) -> Report:
    """Re-score with proper nouns masked.

    Product and company names are long, polysyllabic, and cannot be removed from a
    technical piece, so they set a floor the prose can never beat. The gap between
    the real score and this one is the headroom you actually have. Without it you
    can spend an afternoon chasing a grade level that the subject matter forbids.
    """
    masked = re.sub(r"(?<![.!?]\s)(?<!^)\b[A-Z][A-Za-z0-9.]{2,}\b", "Tool", prose)
    return analyse(masked)


def subordinated(sentence: str) -> bool:
    """True if a long sentence is genuinely tangled rather than a plain list.

    Length alone is a bad target. A 34-word parallel list ("assemble the context,
    call the model, run the tool...") reads fine; a 25-word sentence with three
    nested clauses does not. Split on this, not on word count.
    """
    markers = (r"\b(which|whose|because|although|though|whereas|while|since|unless|"
               r"when|where|if|so that|such that|rather than|instead of)\b")
    return len(re.findall(markers, sentence, re.I)) >= 2


def skim_spine(source: str) -> list[tuple[str, str]]:
    """Headings plus the first sentence of every paragraph.

    This is how a long post is actually read. If the argument does not survive here,
    it does not survive. Openers that say nothing alone ("First, the word.", "This is
    not a matter of taste.") mark paragraphs whose topic sentence is doing no work.
    Readability formulas cannot see this at all.
    """
    body = source
    for pattern in (r"<pre\b.*?</pre>", r"<figure\b.*?</figure>", r"<table\b.*?</table>",
                    r"<script\b.*?</script>", r"<details\b.*?</details>"):
        body = re.sub(pattern, " ", body, flags=re.S | re.I)

    spine = []
    for tag, inner in re.findall(r"<(h2|h3|p)\b[^>]*>(.*?)</\1>", body, flags=re.S | re.I):
        text = html.unescape(re.sub(r"<[^>]+>", "", inner))
        text = re.sub(r"\s+", " ", text).strip()
        if not text:
            continue
        if tag.lower().startswith("h"):
            spine.append(("heading", text))
        else:
            spine.append(("para", split_sentences(text + " ")[0] if split_sentences(text + " ") else text))
    return spine


def band(score: float) -> str:
    for limit, label in ((90, "very easy"), (80, "easy"), (70, "fairly easy"),
                         (60, "plain English"), (50, "fairly hard"), (30, "hard")):
        if score >= limit:
            return label
    return "very hard"


def print_spine(source: str) -> None:
    print("\n  SKIM SPINE (headings + first sentence of each paragraph).")
    print("  If the argument does not hold here, readers skimming will not get it.\n")
    for kind, text in skim_spine(source):
        print(f"\n  ## {text}" if kind == "heading" else f"    - {text}")
    print()


def main(path: str, spine: bool = False) -> int:
    source = open(path, encoding="utf-8").read()
    prose = extract_prose(source)
    r = analyse(prose)
    if spine:
        print(f"\n{path}")
        print_spine(source)
        return 0

    print(f"\n{path}")
    print(f"  prose words        {r.words}   sentences {r.sentences}"
          f"   avg {r.wps:.1f} words/sentence")
    print(f"  Flesch Reading Ease {r.flesch:5.1f}  ({band(r.flesch)}; higher is easier, aim 50-70)")
    print(f"  Flesch-Kincaid      {r.fk_grade:5.1f}  (US grade level; aim 9-12)")
    print(f"  Gunning Fog         {r.fog:5.1f}  (years of education; aim under 12)")

    pct = lambda n: 100 * n / max(1, r.sentences)
    very = [s for s in r.long if s[0] > VERY_LONG_SENTENCE]
    print(f"\n  long sentences      {len(r.long):3d}  ({pct(len(r.long)):.0f}% over {LONG_SENTENCE} words,"
          f" {len(very)} over {VERY_LONG_SENTENCE})")
    print(f"  adverbs             {len(r.adverbs):3d}  (aim under {max(1, r.sentences // 3)})")
    print(f"  passive             {len(r.passives):3d}  ({pct(len(r.passives)):.0f}% of sentences; aim under 10%)")

    floor = vocabulary_floor(prose)
    print(f"\n  vocabulary floor    {floor.fk_grade:5.1f}  (grade with proper nouns masked;"
          f" headroom {r.fk_grade - floor.fk_grade:+.1f})")

    if r.long:
        tangled = [(n, s) for n, s in r.long if subordinated(s)]
        print(f"\n  worst sentences ({len(tangled)} of {len(r.long)} are genuinely subordinated,"
              f" the rest are plain lists):")
        for n, s in sorted(r.long, reverse=True)[:5]:
            mark = "TANGLED" if subordinated(s) else "list   "
            print(f"    [{mark} {n}w] {s[:130]}{'...' if len(s) > 130 else ''}")
    if r.passives:
        print("\n  passive constructions:")
        seen = set()
        for phrase, sentence in r.passives[:8]:
            if phrase.lower() in seen:
                continue
            seen.add(phrase.lower())
            print(f"    \"{phrase}\"  in: {sentence[:110]}...")
    if r.adverbs:
        from collections import Counter
        common = Counter(a.lower() for a in r.adverbs).most_common(8)
        print("\n  adverbs: " + ", ".join(f"{w} ({n})" if n > 1 else w for w, n in common))
    print()
    return 0


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    spine = "--spine" in sys.argv
    if not args:
        print(__doc__)
        sys.exit(2)
    sys.exit(max(main(p, spine) for p in args))
