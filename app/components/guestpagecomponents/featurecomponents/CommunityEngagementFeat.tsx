import React from 'react';

const CommunityEngagementToolsFeat: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Community Engagement Tools
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center mb-8">
                    Our platform provides various tools and features to enhance community engagement. 
                    You can interact with other community members through comments, likes, shares, 
                    and direct messaging. Foster connections and collaborations within the community 
                    and create a positive impact.
                </p>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <div className="bg-gray-50 rounded-lg shadow-lg p-5">
                            <h3 className="text-3xl text-gray-800 font-bold mb-2">
                                Comments
                            </h3>
                            <p className="text-gray-600">
                                Engage in meaningful discussions and share your thoughts on various topics.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <div className="bg-gray-50 rounded-lg shadow-lg p-5">
                            <h3 className="text-3xl text-gray-800 font-bold mb-2">
                                Likes
                            </h3>
                            <p className="text-gray-600">
                                Show your support and appreciation for posts and comments that resonate with you.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <div className="bg-gray-50 rounded-lg shadow-lg p-5">
                            <h3 className="text-3xl text-gray-800 font-bold mb-2">
                                Shares
                            </h3>
                            <p className="text-gray-600">
                                Share valuable content with your network and contribute to the spread of knowledge.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <div className="bg-gray-50 rounded-lg shadow-lg p-5">
                            <h3 className="text-3xl text-gray-800 font-bold mb-2">
                                Direct Messaging
                            </h3>
                            <p className="text-gray-600">
                                Connect directly with other community members for more personal and private conversations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityEngagementToolsFeat;
