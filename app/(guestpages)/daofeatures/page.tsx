"use client";

import Head from 'next/head';
import Image from 'next/image';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/JoinOurCommunitySection';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import React from 'react';

const DAOFeaturesHero = () => {
  return (
    <div className="relative pt-48 pb-60 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      {/* Hexagon Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
              <span className="text-yellow-400">Decentralized Autonomous Organization</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Our Community
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Experience the future of business networking through our innovative DAO features, designed to empower black-owned businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-semibold text-black hover:shadow-lg transition-all relative overflow-hidden">
                <span className="relative z-10">Explore Features</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              <button className="group px-8 py-4 border-2 border-white rounded-full font-semibold text-white hover:bg-white hover:text-indigo-900 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 relative mt-8 md:mt-0">
            <div className="relative w-full h-[500px]">
              {/* Feature Cards */}
              <div className="absolute top-0 left-0 w-64 h-32 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:-translate-y-2 transition-transform">
                <h3 className="text-lg font-semibold mb-2">Governance</h3>
                <p className="text-sm text-gray-300">Community-driven decision making</p>
              </div>
              <div className="absolute top-1/3 right-0 w-64 h-32 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:-translate-y-2 transition-transform">
                <h3 className="text-lg font-semibold mb-2">Business Tools</h3>
                <p className="text-sm text-gray-300">Comprehensive suite for growth</p>
              </div>
              <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform hover:-translate-y-2 transition-transform">
                <h3 className="text-lg font-semibold mb-2">Networking</h3>
                <p className="text-sm text-gray-300">Connect with the community</p>
              </div>
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
      
      {/* Add this style for the blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

const GovernanceFeatures = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Governance</h2>
            <p className="text-xl text-gray-600">Participate in shaping the future of our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Voting Rights</h3>
              <p className="text-gray-600">Participate in key decisions that affect our community through secure and transparent voting.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Proposal System</h3>
              <p className="text-gray-600">Submit and discuss proposals to improve our platform and community initiatives.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Roles</h3>
              <p className="text-gray-600">Earn roles and responsibilities based on your contributions to the community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessTools = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Business Tools</h2>
            <p className="text-xl text-gray-600">Powerful tools to help your business grow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Track your business performance with detailed analytics and insights.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Event Management</h3>
              <p className="text-gray-600">Create and manage business events, workshops, and promotions.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Marketing Tools</h3>
              <p className="text-gray-600">Access email marketing, social media, and promotional tools.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Financial Tools</h3>
              <p className="text-gray-600">Manage payments, invoices, and financial reporting.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NetworkingFeatures = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Networking Features</h2>
            <p className="text-xl text-gray-600">Connect and grow with our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Business Directory</h3>
              <p className="mb-6">Get discovered by customers and other businesses in our comprehensive directory.</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Detailed business profiles
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Category-based search
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Review and rating system
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Community Forums</h3>
              <p className="mb-6">Engage in discussions, share knowledge, and build relationships.</p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Topic-based discussions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Expert advice sections
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Resource sharing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceCenter = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resource Center</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <Image 
                  src="/images/sbblogo.png"
                  alt="Educational Resources"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Educational Resources</h3>
                <p className="text-gray-600 mb-4">Access courses, workshops, and tutorials to grow your business skills.</p>
                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Learn More →</a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <Image 
                  src="/images/sbblogo.png"
                  alt="Funding Opportunities"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Funding Opportunities</h3>
                <p className="text-gray-600 mb-4">Discover grants, loans, and investment opportunities for your business.</p>
                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Learn More →</a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <Image 
                  src="/images/sbblogo.png"
                  alt="Mentorship Program"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Mentorship Program</h3>
                <p className="text-gray-600 mb-4">Connect with experienced mentors who can guide your business journey.</p>
                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DAOFeatures() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SBB DAO - Features</title>
        <meta name="description" content="Explore the features and tools that make SBB DAO the perfect platform for supporting black-owned businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content with padding-top to account for fixed navbar */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero">
          <DAOFeaturesHero />
        </section>
        
        {/* Governance Features Section */}
        <section id="governance">
          <GovernanceFeatures />
        </section>
        
        {/* Business Tools Section */}
        <section id="business-tools">
          <BusinessTools />
        </section>
        
        {/* Networking Features Section */}
        <section id="networking">
          <NetworkingFeatures />
        </section>
        
        {/* Resource Center Section */}
        <section id="resources">
          <ResourceCenter />
        </section>
        
        {/* Join Our Community Section */}
        <section id="join">
          <JoinOurCommunitySection />
        </section>
      </main>
    </div>
  );
} 