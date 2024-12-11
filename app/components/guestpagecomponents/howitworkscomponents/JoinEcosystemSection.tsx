/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const JoinEcosystemSection: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Join the Ecosystem
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center">
                    Joining our ecosystem is a simple process. Start by creating an account, setting up a profile, and becoming an active participant in the community. Your journey towards supporting black-owned businesses and fostering community development starts here.
                </p>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
                                Step 1: Create an Account
                            </p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">
                                Sign up with your email address to create a new account. It's quick and easy!
                            </div>
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
                                Step 2: Set Up a Profile
                            </p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">
                                Customize your profile with relevant information about yourself or your business.
                            </div>
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
                                Step 3: Become an Active Participant
                            </p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">
                                Start engaging with the community, supporting black-owned businesses, and contributing to discussions.
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinEcosystemSection;
