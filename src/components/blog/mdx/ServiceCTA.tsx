// src/components/blog/ServiceCTA.tsx
import Link from 'next/link';

interface ServiceCTAProps {
  service: string;
  description: string;
  features: string[];
  buttonLink: string;
}

export default function ServiceCTA({
  service,
  description,
  features,
  buttonLink,
}: ServiceCTAProps) {
  return (
    <div className="bg-white p-6 md:p-8 my-8 rounded-sm border border-gray-200 shadow-sm">
      <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
        <span className="text-primary">Service:</span> {service}
      </h3>
      <p className="text-gray-700 mb-4">{description}</p>

      <h4 className="font-medium text-charcoal mb-2">Key Benefits:</h4>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={buttonLink}
        className="bg-primary hover:bg-purple-800 text-white px-6 py-2 font-medium transition-colors duration-300"
      >
        Learn More About This Service
      </Link>
    </div>
  );
}
