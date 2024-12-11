import BusinessDirectoryFeat from '@/app/components/guestpagecomponents/featurecomponents/BusinessDirectoryFeat';
import CollaborativeProgramsFeat from '@/app/components/guestpagecomponents/featurecomponents/CollaborativeProgramsFeat';
import CommunityEngagementFeat from '@/app/components/guestpagecomponents/featurecomponents/CommunityEngagementFeat';
import CommunityGovernanceFeat from '@/app/components/guestpagecomponents/featurecomponents/CommunityGovernanceFeat';
import DataPrivacyAndSecurityFeat from '@/app/components/guestpagecomponents/featurecomponents/DataPrivacyAndSecurityFeat';
import EducationalResourcesFeat from '@/app/components/guestpagecomponents/featurecomponents/EducationalResourcesFeat';
import EmergingTechFeat from '@/app/components/guestpagecomponents/featurecomponents/EmergingTechFeat';
import FooterSection from '@/app/components/guestpagecomponents/homecomponents/FooterSection';
import { Fragment } from 'react';
import Head from 'next/head';
import IntroductionFeat from '@/app/components/guestpagecomponents/featurecomponents/Introductionfeat';
import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import OnlineMarketplaceFeat from '@/app/components/guestpagecomponents/featurecomponents/OnlineMarketplaceFeat';
import ShortVideoCreationFeat from '@/app/components/guestpagecomponents/featurecomponents/ShortVideoCreationFeat';

const Features = () => {
  return (
    <Fragment>
      <Head>
        <title>Features</title>
        <meta name="description" content="Explore the features of our platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
        <Navbar />
        <IntroductionFeat />
        <BusinessDirectoryFeat />
        <ShortVideoCreationFeat />
        <CommunityEngagementFeat />
        <OnlineMarketplaceFeat />
        <EducationalResourcesFeat />
        <CollaborativeProgramsFeat />
        <CommunityGovernanceFeat />
        <EmergingTechFeat />
        <DataPrivacyAndSecurityFeat />
        <FooterSection />
      </div>
    </Fragment>
  );
};

export default Features;
