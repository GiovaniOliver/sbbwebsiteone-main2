import AboutUsSection from './components/guestpagecomponents/AboutUsSection';
import BlackOwnedBusinessDirectorySection from './components/guestpagecomponents/BusinessDirectorySection';
import CommunityEngagementSection from './components/guestpagecomponents/CommunityEngagementSection';
import CommunityGovernanceSection from '@/app/components/guestpagecomponents/CommunityGovernanceSection';
import EducationalResourcesSection from '@/app/components/guestpagecomponents/EducationalResourcesSection';
import Footer from '@/app/components/guestpagecomponents/FooterSection';
import Head from 'next/head';
import HeroSection from '@/app/components/guestpagecomponents/HeroSection';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/JoinOurCommunitySection';
import { Navbar } from './components/guestpagecomponents/NavbarGuest';
import OnlineMarketplaceSection from '@/app/components/guestpagecomponents/OnlineMarketplaceSection';
import React from 'react';
import SocialNetworkFeaturesSection from '@/app/components/guestpagecomponents/SocialNetworkFeaturesSection';

export default function GuestHome() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SBB DAO - Supporting Black-Owned Businesses</title>
        <meta name="description" content="SBB DAO - A decentralized ecosystem supporting black-owned businesses and community development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content with padding-top to account for fixed navbar */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>
        
        {/* About Us Section */}
        <section id="about">
          <AboutUsSection />
        </section>
        
        {/* Community Engagement Section */}
        <section id="community-engagement">
          <CommunityEngagementSection />
        </section>
        
        {/* Business Directory Section */}
        <section id="business-directory">
          <BlackOwnedBusinessDirectorySection />
        </section>
        
        {/* Social Network Features Section */}
        <section id="social-features">
          <SocialNetworkFeaturesSection />
        </section>
        
        {/* Online Marketplace Section */}
        <section id="marketplace">
          <OnlineMarketplaceSection />
        </section>
        
        {/* Educational Resources Section */}
        <section id="education">
          <EducationalResourcesSection />
        </section>
        
        {/* Community Governance Section */}
        <section id="governance">
          <CommunityGovernanceSection />
        </section>
        
        {/* Join Our Community Section */}
        <section id="join">
          <JoinOurCommunitySection />
        </section>
      </main>
      
   
    </div>
  );
}

