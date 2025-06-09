import React from 'react';

interface PlaceholderImageProps {
  category: string;
  className?: string;
  width?: number;
  height?: number;
  showLabel?: boolean;
}

export default function PlaceholderImage({
  category,
  className = 'w-full h-full',
  width = 400,
  height = 300,
  showLabel = true,
}: Readonly<PlaceholderImageProps>) {
  // Generate a color based on the category
  const getColorByCategory = (category: string) => {
    switch (category) {
      case 'Social Media':
        return { bg: '#E9F5FE', text: '#0077B6' };
      case 'Viral Content':
        return { bg: '#FFF1E6', text: '#FF8C42' };
      case 'Ad Campaigns':
        return { bg: '#F0FFF4', text: '#38A169' };
      case 'Brand Identity':
        return { bg: '#F6F0FF', text: '#805AD5' };
      default:
        return { bg: '#F9FAFB', text: '#4B5563' };
    }
  };

  const { bg, text } = getColorByCategory(category);

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        backgroundColor: bg,
        color: text,
        width: width,
        height: height,
      }}
    >
      {showLabel && (
        <div className="text-center p-4">
          <div className="text-3xl mb-2">📷</div>
          <div className="text-sm font-medium">{category} Project</div>
        </div>
      )}
    </div>
  );
}
