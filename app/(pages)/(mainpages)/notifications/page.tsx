/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Layout from '@/app/components/usersmaincomponents/homefeed/Layout';
import { Bell } from 'lucide-react';

const NotificationsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Notifications</h1>
            <p className="text-lg text-gray-600 mb-6">
              Your notification center is coming soon! Stay tuned for updates about your activities and interactions.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="font-semibold text-gray-900 mb-2">You'll be notified about:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>New messages and mentions</li>
              <li>Community updates and announcements</li>
              <li>Interaction with your posts</li>
              <li>Important system notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage; 