import React from 'react';

const BusinessDirectorySectionFeat: React.FC = () => {
    return (
        <section className="py-12 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl mb-4 font-semibold font-heading">Black-Owned Business Directory</h2>
                <p className="mb-6 text-gray-500 leading-relaxed">
                    Discover and support a variety of black-owned businesses within our ecosystem. 
                    Search and explore based on location, category, or specific criteria. 
                    Our comprehensive directory promotes visibility and growth for black-owned businesses.
                </p>
                <a className="inline-block py-4 px-8 leading-none text-white bg-indigo-600 hover:bg-indigo-500 rounded shadow" href="#">Explore Directory</a>
            </div>
        </section>
    );
};

export default BusinessDirectorySectionFeat;
