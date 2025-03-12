// app/components/BodyContentSection.tsx
import React from 'react';

type BodyContentSectionProps = {
    content: string;
}

const BodyContentSection: React.FC<BodyContentSectionProps> = ({ content }) => {
    return (
        <div className="px-10 py-5">
            <p className="text-lg">{content}</p>
        </div>
    );
};

export default BodyContentSection;
