// app/components/CTASection.tsx
import React from 'react';

type CTASectionProps = {
    ctaText: string;
}

const CTASection: React.FC<CTASectionProps> = ({ ctaText }) => {
    return (
        <div className="px-10 py-5 bg-gray-100 text-center rounded">
            <h2 className="text-2xl font-bold mb-2">{ctaText}</h2>
            <button className="px-5 py-2 bg-blue-500 text-white rounded-full">
                Subscribe
            </button>
        </div>
    );
};

export default CTASection;
