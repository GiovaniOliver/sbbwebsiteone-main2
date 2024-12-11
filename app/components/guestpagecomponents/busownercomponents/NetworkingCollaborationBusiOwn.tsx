/* eslint-disable @next/next/no-img-element */
import React from 'react';

const NetworkingCollaborationBusiOwn: React.FC = () => {
  return (
    <div className="flex flex-wrap bg-white py-12 px-8">
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Networking and Collaboration</h2>
        <p className="text-lg mb-4">
          Connect with other business owners, join industry-specific groups or communities, and explore collaboration opportunities within the ecosystem.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full">Learn More</button>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <img src="/path-to-your-image.jpg" alt="Networking and Collaboration" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default NetworkingCollaborationBusiOwn;
