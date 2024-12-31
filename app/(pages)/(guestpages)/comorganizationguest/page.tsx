import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import React from 'react';

const CommunityOrganization: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Community Organization</h1>
        <p className="text-lg mb-4">Coming soon...</p>
      </div>
    </div>
  );
};

export default CommunityOrganization;
