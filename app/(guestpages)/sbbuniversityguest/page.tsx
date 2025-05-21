"use client";

import Head from 'next/head';
import Image from 'next/image';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/JoinOurCommunitySection';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import React from 'react';

const SBBUniversityHero = () => {
  return (
    <div className="relative pt-28 pb-40 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
              <span className="text-yellow-400">Learn & Grow</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SBB
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                University
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Access world-class education and resources designed specifically for black business owners and entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-semibold text-black hover:shadow-lg transition-all relative overflow-hidden">
                <span className="relative z-10">Browse Courses</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              <button className="group px-8 py-4 border-2 border-white rounded-full font-semibold text-white hover:bg-white hover:text-indigo-900 transition-all">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-10">
              {[
                { count: '50+', label: 'Courses' },
                { count: '1000+', label: 'Students' },
                { count: '25+', label: 'Expert Instructors' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.count}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20"></div>
                  <Image
                    src="/images/sbblogo.png"
                    alt={`Course ${index}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-2xl"
                  />
                </div>
              ))}
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

const FeaturedCourses = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">Start your learning journey today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Business Fundamentals',
                description: 'Learn the essentials of starting and running a successful business.',
                duration: '8 weeks',
                level: 'Beginner'
              },
              {
                title: 'Digital Marketing',
                description: 'Master modern marketing strategies for business growth.',
                duration: '6 weeks',
                level: 'Intermediate'
              },
              {
                title: 'Financial Management',
                description: 'Understand key financial concepts and business planning.',
                duration: '10 weeks',
                level: 'Advanced'
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src="/images/sbblogo.png"
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between text-white text-sm">
                      <span>{course.duration}</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SBBUniversity() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SBB DAO - University</title>
        <meta name="description" content="Access world-class education and resources for black business owners and entrepreneurs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <SBBUniversityHero />
        <FeaturedCourses />
        <JoinOurCommunitySection />
      </main>
    </div>
  );
}
