/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const GovernanceAndDecisionMaking: React.FC = () => {
    return (
        <div className="bg-white py-8 px-4 md:px-10 my-10 rounded-lg shadow-md text-gray-600">
            <h2 className="font-bold text-2xl mb-5">Governance and Decision-Making</h2>
            <p className="mb-4">
                Our platform is governed by the community, for the community. As a member, you have a say in the decision-making processes that shape our ecosystem.
            </p>
            <p className="mb-4">
                Participate in voting mechanisms, submit proposals, and contribute to the discussions that drive our platform forward. Your involvement is crucial to our community's success.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
            </button>
        </div>
    );
};

export default GovernanceAndDecisionMaking;
