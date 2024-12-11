/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

const ProfileCreationBusiOwn = () => {
  return (
    <section className="py-12 px-4 text-center">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-4xl mb-4 font-heading">Profile Creation</h2>
        <p className="mb-8 text-gray-500 leading-relaxed">
          Creating a business profile on our platform is a straightforward process. Provide relevant information about your business, including the name, description, contact details, and the products or services you offer. Your profile is your business's storefront in our ecosystem, so make it engaging and informative.
        </p>
        <div className="flex flex-wrap items-center -mx-8">
          <div className="mb-8 w-full lg:w-1/2 px-8">
            <img className="rounded shadow-md" src="https://via.placeholder.com/400" alt=""/>
          </div>
          <div className="mb-8 w-full lg:w-1/2 px-8">
            <h3 className="text-2xl mb-4 font-heading">Step-by-Step Guide</h3>
            <p className="mb-4 text-gray-500 leading-relaxed">
              We provide a step-by-step guide to help you set up your business profile. The guide includes tips on how to make your profile stand out and attract potential customers.
            </p>
            <button className="py-4 px-8 rounded bg-indigo-600 text-white">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCreationBusiOwn;
