import AboutUsSection from './components/guestpagecomponents/homecomponents/AboutUsSection';
import BlackOwnedBusinessDirectorySection from './components/guestpagecomponents/homecomponents/BusinessDirectorySection';
import CommunityEngagementSection from './components/guestpagecomponents/homecomponents/CommunityEngagementSection';
import CommunityGovernanceSection from '@/app/components/guestpagecomponents/homecomponents/CommunityGovernanceSection';
import EducationalResourcesSection from '@/app/components/guestpagecomponents/homecomponents/EducationalResourcesSection';
import Footer from '@/app/components/guestpagecomponents/homecomponents/FooterSection';
import Head from 'next/head';
import HeroSection from '@/app/components/guestpagecomponents/homecomponents/HeroSection';
import JoinOurCommunitySection from '@/app/components/guestpagecomponents/homecomponents/JoinOurCommunitySection';
import { Navbar } from './components/guestpagecomponents/homecomponents/NavbarGuest';
import OnlineMarketplaceSection from '@/app/components/guestpagecomponents/homecomponents/OnlineMarketplaceSection';
import React from 'react';
import SocialNetworkFeaturesSection from '@/app/components/guestpagecomponents/homecomponents/SocialNetworkFeaturesSection';

export default function GuestHome() {
  return (
    
    <div>
     
      <Navbar/>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page of the website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <AboutUsSection />
      <CommunityEngagementSection />
      <BlackOwnedBusinessDirectorySection />
      <SocialNetworkFeaturesSection />
      <OnlineMarketplaceSection />
      <EducationalResourcesSection />
      <CommunityGovernanceSection />
      <JoinOurCommunitySection />
      <Footer />
    </div>
  );
}

