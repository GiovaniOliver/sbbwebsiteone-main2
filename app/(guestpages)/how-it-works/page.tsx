"use client";

import Head from 'next/head';
import Image from 'next/image';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/JoinOurCommunitySection';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import React from 'react';

const HowItWorksHero = () => {
  return (
    <div className="relative pt-48 pb-24 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
            <span className="text-yellow-400">Simple Steps to Success</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Understanding
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              How It Works
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Discover how our platform connects and empowers black-owned businesses through a simple, effective process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: '01',
                title: 'Join',
                description: 'Create your account and complete your profile'
              },
              {
                step: '02',
                title: 'Connect',
                description: 'Network with other businesses and supporters'
              },
              {
                step: '03',
                title: 'Grow',
                description: 'Access resources and support to scale your business'
              }
            ].map((item, index) => (
              <div key={item.step} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <div className="text-yellow-400 font-bold text-lg mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
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

const ProcessSteps = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">A detailed look at how our platform works</p>
          </div>
          <div className="space-y-12">
            {[
              {
                title: 'Create Your Profile',
                description: 'Sign up and create a detailed profile for your business or as a community supporter.',
                icon: '👤'
              },
              {
                title: 'Connect with the Community',
                description: 'Join discussions, participate in events, and network with other members.',
                icon: '🤝'
              },
              {
                title: 'Access Resources',
                description: 'Get access to educational content, business tools, and support services.',
                icon: '📚'
              },
              {
                title: 'Grow Together',
                description: 'Collaborate with others, share experiences, and help the community thrive.',
                icon: '🌱'
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-8 p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 flex-shrink-0 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SBB DAO - How It Works</title>
        <meta name="description" content="Learn how SBB DAO empowers black-owned businesses through our platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HowItWorksHero />
        <ProcessSteps />
        <JoinOurCommunitySection />
      </main>
    </div>
  );
}