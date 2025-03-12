import AmplifyVoicesComSupp from '@/app/components/guestpagecomponents/AmplifyVoicesComSupp';
import CallToActionComSupp from '@/app/components/guestpagecomponents/CallToActionComSupp';
import CommunityCollaborationComSupp from '@/app/components/guestpagecomponents/CommunityCollaborationComSupp';
import EducationalResourcesComSupp from '@/app/components/guestpagecomponents/EducationalResourcesComSupp';
import EngageInteractComSupp from '@/app/components/guestpagecomponents/EngageInteractComSupp';
import Footer from '@/app/components/footer';
import IntroductionComSupp from '@/app/components/guestpagecomponents/IntroductionComSupp';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import NetworkingOpportunitiesComSupp from '@/app/components/guestpagecomponents/NetworkingOpportunitiesComSupp';
import PurposeBenefitsComSupp from '@/app/components/guestpagecomponents/PurposeBenefitsComSupp';
import React from 'react';
import RecognitionRewardsComSupp from '@/app/components/guestpagecomponents/RecognitionRewardsComSupp';
import WaysToSupportComSupp from '@/app/components/guestpagecomponents/WaysToSupportComSupp';

const CommunitySupportersPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <IntroductionComSupp />
      <PurposeBenefitsComSupp />
      <WaysToSupportComSupp />
      <NetworkingOpportunitiesComSupp />
      <AmplifyVoicesComSupp />
      <EngageInteractComSupp />
      <EducationalResourcesComSupp />
      <CommunityCollaborationComSupp />
      <RecognitionRewardsComSupp />
      <CallToActionComSupp />
      <Footer/>
    </div>
  );
};

export default CommunitySupportersPage;



