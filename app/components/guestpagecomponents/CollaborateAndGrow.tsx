import React from 'react';

const CollaborateAndGrow: React.FC = () => {
    return (
        <div className="bg-white py-8 px-4 md:px-10 my-10 rounded-lg shadow-md text-gray-600">
            <h2 className="font-bold text-2xl mb-5">Collaborate and Grow</h2>
            <p className="mb-4">
                Our ecosystem encourages collaboration and mutual growth. Connect with other businesses, organizations, or individuals to foster development and achieve shared goals.
            </p>
            <p className="mb-4">
                Explore partnership opportunities, engage in joint ventures, or utilize shared resources to enhance your growth within the community. Together, we can achieve more.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
            </button>
        </div>
    );
};

export default CollaborateAndGrow;
