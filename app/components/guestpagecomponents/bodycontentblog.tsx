"use client";

// app/components/BodyContentSection.tsx
import React from 'react';

type BodyContentSectionProps = {
    content: string;
}

const BodyContentSection: React.FC<BodyContentSectionProps> = ({ content }) => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <p className="text-lg leading-relaxed text-gray-700">{content}</p>
            </div>
        </div>
    );
};

export default BodyContentSection;
