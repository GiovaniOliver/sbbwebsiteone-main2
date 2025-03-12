// app/components/IntroductionSection.tsx
import React from 'react';

type IntroductionSectionProps = {
    content: string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ content }) => {
    return (
        <div className="px-10 py-5">
            <h2 className="text-2xl mb-4">Introduction</h2>
            <p className="text-lg">{content}</p>
        </div>
    );
};

export default IntroductionSection;
