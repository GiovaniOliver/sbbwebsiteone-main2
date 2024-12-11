import React from 'react';

const IntegrationWithEmergingTechFeat: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Integration with Emerging Technologies</h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6">AI</p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">Artificial Intelligence</div>
                            <p className="text-gray-800 text-base px-6 mb-5">AI enhances the user experience, provides personalized recommendations, and drives platform growth.</p>
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6">Game Theory</p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">Game Theory</div>
                            <p className="text-gray-800 text-base px-6 mb-5">Game theory is utilized to create a fair and balanced ecosystem for all users.</p>
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6">Social Media</p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">Social Media</div>
                            <p className="text-gray-800 text-base px-6 mb-5">Social media integration allows for seamless sharing and promotion of content across various platforms.</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntegrationWithEmergingTechFeat;
