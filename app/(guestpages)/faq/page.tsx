"use client";

import Footer from '@/app/components/guestpagecomponents/FooterSection';
import Head from 'next/head';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/JoinOurCommunitySection';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import React from 'react';

const FAQHero = () => {
  return (
    <div className="relative pt-32 pb-24 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="relative">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20">
              <span className="text-yellow-400">Got Questions?</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
              Find answers to common questions about SBB DAO, our community, and how we support black-owned businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-semibold text-white hover:shadow-lg transition-all">
                Browse FAQs
              </button>
              <button className="px-8 py-4 bg-white bg-opacity-20 rounded-full font-semibold text-white hover:bg-opacity-30 transition-all">
                Contact Support
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

const FAQCategories = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Getting Started</h3>
          <p className="text-gray-600 mb-4">Learn how to join our community and get started with SBB DAO.</p>
          <a href="#getting-started" className="text-indigo-600 font-medium hover:text-indigo-800">View FAQs</a>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Community</h3>
          <p className="text-gray-600 mb-4">Questions about our community features and how to engage.</p>
          <a href="#community" className="text-purple-600 font-medium hover:text-purple-800">View FAQs</a>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Business Support</h3>
          <p className="text-gray-600 mb-4">Information about how we support black-owned businesses.</p>
          <a href="#business-support" className="text-yellow-600 font-medium hover:text-yellow-800">View FAQs</a>
        </div>
      </div>
    </div>
  );
};

const FAQAccordion = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="space-y-12">
        <div id="getting-started">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Getting Started</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">What is SBB DAO?</h3>
              <p className="text-gray-600">SBB DAO is a decentralized autonomous organization dedicated to supporting black-owned businesses through community engagement, resources, and technology.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">How do I join SBB DAO?</h3>
              <p className="text-gray-600">You can join SBB DAO by creating an account on our platform. Simply click the "Join" button in the navigation bar and follow the registration process.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Is membership free?</h3>
              <p className="text-gray-600">Yes, basic membership is free. We also offer premium plans with additional features for businesses and active community members.</p>
            </div>
          </div>
        </div>
        
        <div id="community">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Community</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">How can I contribute to the community?</h3>
              <p className="text-gray-600">You can contribute by participating in discussions, sharing resources, supporting businesses, and voting on community proposals.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Are there community events?</h3>
              <p className="text-gray-600">Yes, we regularly host virtual and in-person events including networking sessions, workshops, and business showcases.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">How does governance work?</h3>
              <p className="text-gray-600">Our community uses a democratic governance model where members can propose and vote on initiatives, ensuring that decisions reflect the collective will.</p>
            </div>
          </div>
        </div>
        
        <div id="business-support">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Business Support</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">How can I list my business?</h3>
              <p className="text-gray-600">You can list your business by creating a business profile after registering as a member. Our verification process ensures that all listed businesses meet our criteria.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">What resources are available for businesses?</h3>
              <p className="text-gray-600">We offer educational resources, networking opportunities, marketing support, and access to a community of potential customers and partners.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Is there financial support available?</h3>
              <p className="text-gray-600">We connect businesses with funding opportunities, grants, and investors. While we don't directly provide financial support, we facilitate connections to those who do.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Still Have Questions?</h2>
          <p className="text-center text-gray-600 mb-8">Our support team is here to help. Reach out to us and we'll get back to you as soon as possible.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a href="mailto:support@sbbdao.com" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Email Us
            </a>
            <a href="#" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Live Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SBB DAO - FAQ</title>
        <meta name="description" content="Frequently asked questions about SBB DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content with padding-top to account for fixed navbar */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero">
          <FAQHero />
        </section>
        
        {/* FAQ Categories Section */}
        <section id="faq-categories">
          <FAQCategories />
        </section>
        
        {/* FAQ Accordion Section */}
        <section id="faq-accordion">
          <FAQAccordion />
        </section>
        
        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
        
        {/* Join Our Community Section */}
        <section id="join">
          <JoinOurCommunitySection />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
  