import React from 'react';

const BusinessRegistrationBusiOwn: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-white">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Business Registration</h2>
      <p className="mb-8 text-center text-gray-600">
        This section provides information and guidance on how black business owners can register their businesses on the platform. It may include a registration form or link to the registration process.
      </p>
      <a href="/register" className="px-8 py-3 text-white bg-black rounded-md">Register Your Business</a>
    </div>
  );
};

export default BusinessRegistrationBusiOwn;
