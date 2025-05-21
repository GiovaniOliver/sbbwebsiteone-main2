import BusinessDirectoryFeat from '@/app/components/guestpagecomponents/BusinessDirectoryFeat';
import CollaborativeProgramsFeat from '@/app/components/guestpagecomponents/CollaborativeProgramsFeat';
import CommunityEngagementFeat from '@/app/components/guestpagecomponents/CommunityEngagementFeat';
import CommunityGovernanceFeat from '@/app/components/guestpagecomponents/CommunityGovernanceFeat';
import DataPrivacyAndSecurityFeat from '@/app/components/guestpagecomponents/DataPrivacyAndSecurityFeat';
import EducationalResourcesFeat from '@/app/components/guestpagecomponents/EducationalResourcesFeat';
import EmergingTechFeat from '@/app/components/guestpagecomponents/EmergingTechFeat';
import Head from 'next/head';
import IntroductionFeat from '@/app/components/guestpagecomponents/Introductionfeat';
import OnlineMarketplaceFeat from '@/app/components/guestpagecomponents/OnlineMarketplaceFeat';
import ShortVideoCreationFeat from '@/app/components/guestpagecomponents/ShortVideoCreationFeat';

export default function Features() {
  return (
    <>
      <Head>
        <title>Features</title>
        <meta name="description" content="Explore the features of our platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
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
      </div>
    </>
  );
}
