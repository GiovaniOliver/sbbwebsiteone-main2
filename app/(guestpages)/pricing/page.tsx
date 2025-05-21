"use client";

import Footer from '@/app/components/guestpagecomponents/FooterSection';
import Head from 'next/head';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/JoinOurCommunitySection';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import React from 'react';

const PricingHero = () => {
  return (
    <div className="relative pt-24 pb-16 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white z-10">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Pricing</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Join our community and support black-owned businesses with affordable plans
          </p>
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

const PricingPlans = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
          <div className="p-8 bg-gray-50 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Free</h3>
            <p className="text-gray-600 mb-4">Perfect for getting started</p>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </div>
          <div className="p-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Access to business directory</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Basic community features</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Educational resources</span>
              </li>
            </ul>
            <button className="w-full mt-8 px-4 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Get Started
            </button>
          </div>
        </div>
        
        {/* Pro Plan */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-indigo-500 transform scale-105 z-10">
          <div className="p-8 bg-indigo-50 border-b border-indigo-100">
            <div className="bg-indigo-500 text-white text-sm font-bold uppercase py-1 px-3 rounded-full inline-block mb-4">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Pro</h3>
            <p className="text-gray-600 mb-4">For active community members</p>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">$19</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </div>
          <div className="p-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Advanced networking features</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Business promotion tools</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Priority support</span>
              </li>
            </ul>
            <button className="w-full mt-8 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-shadow">
              Get Started
            </button>
          </div>
        </div>
        
        {/* Business Plan */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
          <div className="p-8 bg-gray-50 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Business</h3>
            <p className="text-gray-600 mb-4">For established businesses</p>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">$49</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </div>
          <div className="p-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Featured business listing</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Dedicated account manager</span>
              </li>
            </ul>
            <button className="w-full mt-8 px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-3">Can I change my plan later?</h3>
          <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-3">Do you offer discounts for non-profits?</h3>
          <p className="text-gray-600">Yes, we offer special pricing for non-profit organizations. Please contact our support team for more information.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
          <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers. For cryptocurrency payments, please contact our support team.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-3">Is there a free trial available?</h3>
          <p className="text-gray-600">Yes, we offer a 14-day free trial for our Pro and Business plans. No credit card required to start your trial.</p>
        </div>
      </div>
    </div>
  );
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SBB DAO - Pricing</title>
        <meta name="description" content="Simple, transparent pricing plans for SBB DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content with padding-top to account for fixed navbar */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero">
          <PricingHero />
        </section>
        
        {/* Pricing Plans Section */}
        <section id="pricing-plans" className="bg-gray-50 py-16">
          <PricingPlans />
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="bg-white py-16">
          <FAQ />
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
  