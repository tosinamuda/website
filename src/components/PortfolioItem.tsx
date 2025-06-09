import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export type Portfolio = {
  title: string;
  featuredImage: string;
  link: string;
  category: string;
  description: string;
};

interface PortfolioItemProps {
  portfolio: Portfolio;
}

export default function PortfolioItem({ portfolio: p }: Readonly<PortfolioItemProps>) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
      {/* Image Container with Overlay */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={p.featuredImage}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary/90 backdrop-blur-sm rounded-full">
            {p.category}
          </span>
        </div>

        {/* Hover overlay with project link */}
        <div className="absolute inset-0 bg-purple-300/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <Link
            href={p.link}
            className="inline-block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <div className="flex items-center gap-3 py-3 px-6 bg-white rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-slate-900">View Project</p>
              <FontAwesomeIcon icon={faArrowRight} className="text-slate-900" />
            </div>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {p.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">{p.description}</p>

        {/* Bottom action area */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <Link
            href={p.link}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Learn more
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
