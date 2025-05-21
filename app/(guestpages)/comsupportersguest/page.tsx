"use client";

import Head from 'next/head';
import Image from 'next/image';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/JoinOurCommunitySection';
import React from 'react';

const CommunitySupportersHero = () => {
  return (
    <div className="relative pt-48 pb-24 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-7 gap-12 items-center">
          <div className="md:col-span-5 text-center md:text-left">
            <div className="inline-block px-10 py-1.5 mb-6 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
              <span className="text-yellow-400">Join Our Community</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Community
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Supporters
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-40 max-w-2xl">
              Join a network of passionate individuals and organizations dedicated to empowering and uplifting black-owned businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-semibold text-black hover:shadow-lg transition-all relative overflow-hidden">
                <span className="relative z-10">Become a Supporter</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              <button className="group px-8 py-4 border-2 border-white rounded-full font-semibold text-white hover:bg-white hover:text-indigo-900 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:col-span-2 relative mt-8 md:mt-0">
            <div className="grid grid-cols-3 gap-4 relative">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden transform hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src="/images/sbblogo.png"
                    alt={`Supporter ${index}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-xl"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent rounded-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-white">+50</span>
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
    </div>
  );
};

const SupporterBenefits = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of Supporting</h2>
            <p className="text-xl text-gray-600">Join us in making a difference while gaining valuable benefits</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Networking",
                description: "Connect with like-minded supporters and business owners",
                icon: "🤝"
              },
              {
                title: "Recognition",
                description: "Get featured in our supporter spotlight and community updates",
                icon: "🌟"
              },
              {
                title: "Impact",
                description: "Make a real difference in the black business community",
                icon: "💫"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WaysToSupport = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ways to Support</h2>
            <p className="text-xl text-gray-600">Multiple ways to contribute to our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Mentorship",
                description: "Share your expertise and guide business owners",
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                title: "Investment",
                description: "Support businesses through direct investment",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                title: "Resource Sharing",
                description: "Contribute valuable resources and tools",
                gradient: "from-green-400 to-emerald-500"
              },
              {
                title: "Advocacy",
                description: "Amplify black business voices and initiatives",
                gradient: "from-pink-400 to-rose-500"
              }
            ].map((way, index) => (
              <div key={index} className={`bg-gradient-to-br ${way.gradient} rounded-xl shadow-lg p-8 text-white`}>
                <h3 className="text-2xl font-bold mb-4">{way.title}</h3>
                <p className="mb-6">{way.description}</p>
                <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessStories = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real impact from our community supporters</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src="/images/sbblogo.png"
                    alt={`Success Story ${index}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Success Story {index}</h3>
                  <p className="text-gray-600 mb-4">How our supporters helped transform a local business into a thriving enterprise.</p>
                  <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CommunitySupporters() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SBB DAO - Community Supporters</title>
        <meta name="description" content="Join our community of supporters dedicated to empowering black-owned businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <CommunitySupportersHero />
        </section>
        
        {/* Benefits Section */}
        <section id="benefits">
          <SupporterBenefits />
        </section>
        
        {/* Ways to Support Section */}
        <section id="ways-to-support">
          <WaysToSupport />
        </section>
        
        {/* Success Stories Section */}
        <section id="success-stories">
          <SuccessStories />
        </section>
        
        {/* Join Community Section */}
        <section id="join">
          <JoinOurCommunitySection />
        </section>
      </main>
    </div>
  );
}



