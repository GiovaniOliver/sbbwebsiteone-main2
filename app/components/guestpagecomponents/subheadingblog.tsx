"use client";

import React from 'react';

type SubheadingsSectionProps = {
    subheadings: {
        title: string;
        content: string;
    }[];
}

const SubheadingsSection: React.FC<SubheadingsSectionProps> = ({ subheadings }) => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-8">
                {subheadings.map((subheading, index) => (
                    <div key={index} className="border-l-4 border-indigo-500 pl-6 py-2">
                        <h3 className="text-2xl font-bold mb-3 text-gray-800">{subheading.title}</h3>
                        <p className="text-lg text-gray-600">{subheading.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubheadingsSection;
