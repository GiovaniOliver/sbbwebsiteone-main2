import Image from 'next/image';
import React from 'react';

const ExploreBlackBusinesses: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Explore Black-Owned Businesses
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center mb-8">
                    Discover and explore black-owned businesses within our ecosystem. Use our search filters, categories, or featured businesses to find products or services you are interested in.
                </p>
                <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <div className="w-full font-bold text-xl text-gray-800 px-6">
                                Business Name
                            </div>
                            <p className="text-gray-800 text-base px-6 mb-5">
                                Brief description of the business and its offerings.
                            </p>
                        </a>
                    </div>
                    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                        <div className="flex items-center justify-start">
                            <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExploreBlackBusinesses;
