// src/components/blog/InlineCTA.tsx
import Link from 'next/link';

interface InlineCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  type?: 'primary' | 'secondary';
}

export default function InlineCTA({
  title,
  description,
  buttonText,
  buttonLink,
  type = 'primary',
}: InlineCTAProps) {
  const bgColor = type === 'primary' ? 'bg-soft-apricot' : 'bg-gray-50';

  const buttonStyle =
    type === 'primary'
      ? 'bg-primary hover:bg-purple-800 text-white'
      : 'border border-primary text-primary hover:bg-soft-apricot';

  return (
    <div className={`${bgColor} p-6 md:p-8 my-8 rounded-sm border-l-4 border-primary`}>
      <h3 className="text-xl font-serif font-bold text-charcoal mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link
        href={buttonLink}
        className={`inline-block ${buttonStyle} px-6 py-2 font-medium text-sm transition-colors duration-300`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
