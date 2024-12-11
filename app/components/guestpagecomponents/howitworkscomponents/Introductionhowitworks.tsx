/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const Introductionhowitwork: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    How It Works
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center">
                    Learn how our platform supports black-owned businesses, fosters community building, and promotes community organizations. Here's a step-by-step guide on how to navigate and make the most out of our ecosystem.
                </p>
            </div>
        </section>
    );
};

export default Introductionhowitwork;
