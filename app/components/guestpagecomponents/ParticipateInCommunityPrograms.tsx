/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const ParticipateInCommunityPrograms: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Participate in Community Programs
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center mb-8">
                    We offer a variety of community programs and initiatives aimed at supporting black-owned businesses and fostering community development. From mentorship programs and educational workshops to funding opportunities and events, there's something for everyone. Join us and actively participate in these programs to leverage the full potential of our ecosystem.
                </p>
                <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
                                Mentorship Programs
                            </p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">
                                Connect with experienced mentors and gain valuable insights.
                            </div>
                            <p className="text-gray-800 text-base px-6 mb-5">
                                Our mentorship programs provide a platform for you to connect with experienced professionals in various fields. Gain valuable insights and guidance to help you navigate your entrepreneurial journey.
                            </p>
                        </a>
                    </div>
                    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                        <div className="flex items-center justify-start">
                            <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
                {/* Add more cards as needed */}
            </div>
        </section>
    );
};

export default ParticipateInCommunityPrograms;
