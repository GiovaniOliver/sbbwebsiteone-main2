import AmplifyVoicesComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/AmplifyVoicesComSupp';
import CallToActionComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/CallToActionComSupp';
import CommunityCollaborationComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/CommunityCollaborationComSupp';
import EducationalResourcesComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/EducationalResourcesComSupp';
import EngageInteractComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/EngageInteractComSupp';
import Footer from '@/app/components/footer';
import IntroductionComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/IntroductionComSupp';
import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import NetworkingOpportunitiesComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/NetworkingOpportunitiesComSupp';
import PurposeBenefitsComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/PurposeBenefitsComSupp';
import React from 'react';
import RecognitionRewardsComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/RecognitionRewardsComSupp';
import WaysToSupportComSupp from '@/app/components/guestpagecomponents/comsuppoterscomponents/WaysToSupportComSupp';

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



