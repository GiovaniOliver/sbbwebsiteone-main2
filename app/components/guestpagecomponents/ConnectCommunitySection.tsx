import React from 'react';

const ConnectCommunitySection: React.FC = () => {
    return (
        <section className="py-12 px-4 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl mb-4 font-semibold font-heading">Connect with the Community</h2>
                <p className="mb-6 text-gray-500 leading-relaxed">
                    Our platform emphasizes the importance of connecting with other community members. 
                    Users can follow, interact, and collaborate with other individuals or organizations within the ecosystem. 
                    Features such as direct messaging, group discussions, or joining community events are available to foster these connections.
                </p>
                <div className="flex flex-wrap justify-center mb-10">
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                        <div className="p-6 bg-white shadow rounded">
                            <h3 className="mb-4 text-xl font-semibold font-heading">Direct Messaging</h3>
                            <p className="text-gray-500 leading-relaxed">Connect with other members directly through our secure messaging feature.</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                        <div className="p-6 bg-white shadow rounded">
                            <h3 className="mb-4 text-xl font-semibold font-heading">Group Discussions</h3>
                            <p className="text-gray-500 leading-relaxed">Join in on group discussions to share ideas and collaborate on projects.</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                        <div className="p-6 bg-white shadow rounded">
                            <h3 className="mb-4 text-xl font-semibold font-heading">Community Events</h3>
                            <p className="text-gray-500 leading-relaxed">Participate in community events to network and learn from other members.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectCommunitySection;
