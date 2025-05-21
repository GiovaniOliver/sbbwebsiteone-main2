"use client";

import Image from 'next/image';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative pt-32 pb-80 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-[300px] md:h-[400px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full transform -translate-x-4 -translate-y-4"></div>
              <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src="/images/sbblogo.png"
                  alt="Blog"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
              <span className="text-yellow-400">Latest Insights & Stories</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SBB DAO
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover the latest news, insights, and success stories from our thriving community.
            </p>
            <div className="relative max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
