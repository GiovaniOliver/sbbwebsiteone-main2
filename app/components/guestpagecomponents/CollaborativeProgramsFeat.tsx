import React from 'react';

const CollaborativeProgramsFeat: React.FC = () => {
    return (
        <section className="py-12 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl mb-4 font-semibold font-heading">Collaborative Programs</h2>
                <p className="mb-10 text-gray-500 leading-relaxed">
                    Our ecosystem offers various collaborative programs and initiatives. These include mentorship programs, workshops, funding opportunities, and community events aimed at supporting black-owned businesses and fostering community development. We encourage all users to actively participate and leverage these programs.
                </p>
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
                        <div className="p-6 bg-white rounded shadow">
                            <h3 className="mb-4 text-xl font-semibold font-heading">Mentorship Programs</h3>
                            <p className="text-gray-500 leading-relaxed">Connect with experienced mentors to guide your journey in the ecosystem.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
                        <div className="p-6 bg-white rounded shadow">
                            <h3 className="mb-4 text-xl font-semibold font-heading">Workshops</h3>
                            <p className="text-gray-500 leading-relaxed">Join workshops to learn new skills and knowledge from experts in the field.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
                        <div className="p-6 bg-white rounded shadow">
                            <h3 className="mb-4 text-xl font-semibold font-heading">Funding Opportunities</h3>
                            <p className="text-gray-500 leading-relaxed">Explore funding opportunities to support your business growth and development.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollaborativeProgramsFeat;
