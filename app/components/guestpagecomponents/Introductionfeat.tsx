/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const IntroductionFeat = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col text-center w-full">
                <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">Welcome to Our Platform</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700">
                    Discover the key features and functionalities of our social network DAO ecosystem. 
                    Our platform is designed to support black-owned businesses, foster community building, 
                    and promote community organizations. Let's explore what we have to offer.
                </p>
            </div>
        </div>
    );
};

export default IntroductionFeat;
