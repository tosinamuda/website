'use client';

export default function BlogErrorFallback() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="text-center py-16">
      <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-slate-700 mb-4">Blog Temporarily Unavailable</h3>
        <p className="text-slate-500 mb-6">
          Our blog content is temporarily unavailable. This could be due to maintenance or
          connectivity issues. Please try again later.
        </p>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Page
        </button>
      </div>
    </div>
  );
}
