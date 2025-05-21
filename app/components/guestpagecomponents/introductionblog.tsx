"use client";

import React from 'react';

type IntroductionSectionProps = {
    content: string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ content }) => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
                <p className="text-xl leading-relaxed text-gray-700">{content}</p>
            </div>
        </div>
    );
};

export default IntroductionSection;
