import React from 'react';

const PartnershipsCollaborationsSection: React.FC = () => {
    return (
        <section className="py-12 px-4 text-center">
            <div className="w-full max-w-2xl mx-auto">
                <h2 className="text-4xl mb-4 font-heading">Partnerships and Collaborations</h2>
                <p className="mb-8 text-gray-500 leading-relaxed">
                    SBB University has established partnerships and collaborations with various educational institutions, industry organizations, and experts in the covered subjects. These partnerships enhance the quality and breadth of our educational offerings. Stay tuned for updates on our latest collaborations.
                </p>
                <div className="flex flex-wrap -mx-3">
                    <div className="mb-8 w-full md:w-1/2 lg:w-1/4 px-3">
                        <div className="h-64 bg-gray-300"></div>
                        <h3 className="mt-4 text-xl font-heading">Partner 1</h3>
                        <p className="mt-2 text-gray-500 leading-relaxed">Description of the partnership or collaboration with Partner 1.</p>
                    </div>
                    <div className="mb-8 w-full md:w-1/2 lg:w-1/4 px-3">
                        <div className="h-64 bg-gray-300"></div>
                        <h3 className="mt-4 text-xl font-heading">Partner 2</h3>
                        <p className="mt-2 text-gray-500 leading-relaxed">Description of the partnership or collaboration with Partner 2.</p>
                    </div>
                    <div className="mb-8 w-full md:w-1/2 lg:w-1/4 px-3">
                        <div className="h-64 bg-gray-300"></div>
                        <h3 className="mt-4 text-xl font-heading">Partner 3</h3>
                        <p className="mt-2 text-gray-500 leading-relaxed">Description of the partnership or collaboration with Partner 3.</p>
                    </div>
                    <div className="mb-8 w-full md:w-1/2 lg:w-1/4 px-3">
                        <div className="h-64 bg-gray-300"></div>
                        <h3 className="mt-4 text-xl font-heading">Partner 4</h3>
                        <p className="mt-2 text-gray-500 leading-relaxed">Description of the partnership or collaboration with Partner 4.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnershipsCollaborationsSection;
