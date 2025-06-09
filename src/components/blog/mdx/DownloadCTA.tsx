// src/components/blog/DownloadCTA.tsx
import Link from 'next/link';

interface DownloadCTAProps {
  title: string;
  description: string;
  resourceName: string;
  buttonText: string;
  buttonLink: string;
}

export default function DownloadCTA({
  title,
  description,
  resourceName,
  buttonText,
  buttonLink,
}: DownloadCTAProps) {
  return (
    <div className="bg-gray-50 p-6 md:p-8 my-8 rounded-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-2/3">
          <h3 className="text-xl font-serif font-bold text-charcoal mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Resource:</span> {resourceName}
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <Link
            href={buttonLink}
            className="bg-primary hover:bg-purple-800 text-white px-6 py-3 font-medium rounded-sm transition-colors duration-300 inline-flex items-center"
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
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
