/* eslint-disable @next/next/no-img-element */
import React from 'react';

const OnlineMarketplaceFeat: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Online Marketplace
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center mx-auto mb-6">
                    Our ecosystem introduces an online marketplace, allowing black-owned businesses to list and sell their products or services directly through the platform. It emphasizes features like secure transactions, customer reviews, and ratings, providing an intuitive interface for both buyers and sellers.
                </p>
                <div className="flex flex-wrap">
                    <div className="w-5/6 sm:w-1/2 p-6">
                        <img className="w-full h-64 rounded mb-6 shadow-lg" src="https://via.placeholder.com/400" alt="Online Marketplace" />
                    </div>
                    <div className="w-5/6 sm:w-1/2 p-6">
                        <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                            Secure Transactions
                        </h3>
                        <p className="text-gray-600 mb-8">
                            We prioritize the security of your transactions. Our platform is designed with robust security measures to ensure safe and secure transactions.
                        </p>
                        <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                            Customer Reviews and Ratings
                        </h3>
                        <p className="text-gray-600 mb-8">
                            We believe in transparency and trust. Our platform allows customers to leave reviews and ratings, helping others make informed decisions and providing businesses with valuable feedback.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OnlineMarketplaceFeat;
