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

