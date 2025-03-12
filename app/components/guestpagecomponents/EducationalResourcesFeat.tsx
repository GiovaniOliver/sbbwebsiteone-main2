import React from 'react';

const EducationalResourcesFeat: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Educational Resources
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center mb-8">
                    We provide a wealth of educational resources to empower our community members. These resources cover a wide range of topics, including cryptocurrencies, AI, game theory, economics, psychology, and social media. Our goal is to equip our community with the knowledge they need for personal and professional growth.
                </p>
                {/* Here you can add more specific details about the educational resources or list some of them */}
            </div>
        </section>
    );
};

export default EducationalResourcesFeat;
