// app/components/SubheadingsSection.tsx
import React from 'react';

type SubheadingsSectionProps = {
    subheadings: {
        title: string;
        content: string;
    }[];
}

const SubheadingsSection: React.FC<SubheadingsSectionProps> = ({ subheadings }) => {
    return (
        <div className="px-10 py-5">
            {subheadings.map((subheading, index) => (
                <div key={index} className="mb-6">
                    <h3 className="text-xl mb-2">{subheading.title}</h3>
                    <p className="text-lg">{subheading.content}</p>
                </div>
            ))}
        </div>
    );
};

export default SubheadingsSection;
