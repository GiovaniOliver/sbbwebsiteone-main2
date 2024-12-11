import React from 'react';

const EducationalResourcesBusiOwn: React.FC = () => {
  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <svg className="absolute left-full transform translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <svg className="absolute right-full bottom-0 transform -translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
          <defs>
            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <div className="text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Educational Resources
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Access courses, webinars, and articles focused on business development, financial management, marketing strategies, and other relevant topics.
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Repeat this section for each resource */}
            <div className="pt-6">
              <div className="flow-root bg-gray-200 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      {/* Icon */}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">Resource Title</h3>
                  <p className="mt-5 text-base leading-6 text-gray-500">
                    Brief description of the resource.
                  </p>
                </div>
              </div>
            
            </div>
            {/* End of repeated section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalResourcesBusiOwn;
