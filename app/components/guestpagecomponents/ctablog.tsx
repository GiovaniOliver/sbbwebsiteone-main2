"use client";

// app/components/CTASection.tsx
import React from 'react';

type CTASectionProps = {
    ctaText: string;
}

const CTASection: React.FC<CTASectionProps> = ({ ctaText }) => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">{ctaText}</h2>
                <button className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow">
                    Join Our Community
                </button>
            </div>
        </div>
    );
};

export default CTASection;
