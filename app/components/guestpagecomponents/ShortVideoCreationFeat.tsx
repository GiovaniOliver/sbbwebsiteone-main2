import React from 'react';

const ShortVideoCreationFeat: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Short Video Creation
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center mb-8">
                    Our platform is inspired by the interactive and engaging nature of TikTok. Users can create and share short videos related to supporting black-owned businesses, community building, and other relevant topics. We offer a variety of video editing tools, filters, and effects to help you create engaging content.
                </p>
                {/* Here you can add more specific details about the video creation feature or showcase some of the tools */}
            </div>
        </section>
    );
};

export default ShortVideoCreationFeat;
