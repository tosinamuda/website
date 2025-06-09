// src/components/blog/ResourceCTA.tsx
import Link from 'next/link';

interface ResourceCTAProps {
  title: string;
  description: string;
  resourceType: string;
  resourceName: string;
  ctaLink: string;
  ctaText?: string;
}

export default function ResourceCTA({
  title,
  description,
  resourceType,
  resourceName,
  ctaLink,
  ctaText = 'Download Now',
}: ResourceCTAProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-6 md:p-8 my-8 rounded-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <h3 className="text-xl font-serif font-bold text-charcoal mb-3">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="font-medium mr-2">{resourceType}:</span>
            <span>{resourceName}</span>
          </div>
        </div>

        <div className="md:w-1/3 flex justify-center items-center">
          <Link
            href={ctaLink}
            className="bg-primary hover:bg-purple-800 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-300 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}
