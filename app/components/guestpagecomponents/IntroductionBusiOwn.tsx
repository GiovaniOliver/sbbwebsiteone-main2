"use client";

import React from 'react';

const IntroductionBusiOwn = () => {
  return (
    <section className="relative pt-16 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/sbblogo.png')] bg-repeat opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            For <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Business Owners</span>
          </h1>
          <p className="text-xl md:text-2xl mb-20 text-gray-200 max-w-2xl mx-auto">
            Our platform is dedicated to supporting and empowering black-owned businesses. We provide a range of resources and opportunities to help your business grow and thrive in our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-black hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              Register Your Business
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-bold hover:bg-white hover:text-indigo-900 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default IntroductionBusiOwn;
