/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Layout from '@/app/components/usersmaincomponents/homefeed/homefeed-layout';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
              <Settings className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-lg text-gray-600 mb-6">
              Account settings and preferences are coming soon! We're building powerful customization options for your experience.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="font-semibold text-gray-900 mb-2">Upcoming Settings Features:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Profile customization</li>
              <li>Privacy and security settings</li>
              <li>Notification preferences</li>
              <li>Account management</li>
              <li>Theme customization</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
