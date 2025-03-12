import BusinessRegistrationBusiOwn from '@/app/components/guestpagecomponents/BusinessRegistrationBusiOwn';
import CommunitySupportBusiOwn from '@/app/components/guestpagecomponents/CommunitySupportBusiOwn';
import ContactSupportBusiOwn from '@/app/components/guestpagecomponents/ContactSupportBusiOwn';
import EducationalResourcesBusiOwn from '@/app/components/guestpagecomponents/EducationalResourcesBusiOwn';
import FundingAndFinancialResourcesBusiOwn from '@/app/components/guestpagecomponents/FundingAndFinancialResourcesBusiOwn';
import IntroductionBusiOwn from '@/app/components/guestpagecomponents/IntroductionBusiOwn';
import MarketingPromotionBusiOwn from '@/app/components/guestpagecomponents/MarketingPromotionBusiOwn';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import NetworkingCollaborationBusiOwn from '@/app/components/guestpagecomponents/NetworkingCollaborationBusiOwn';
import ProfileCreationBusiOwn from '@/app/components/guestpagecomponents/ProfileCreationBusiOwn';
import React from 'react';
import ShowcaseYourBusinessBusiOwn from '@/app/components/guestpagecomponents/ShowcaseYourBusinessBusiOwn';
import SuccessStoriesBusiOwn from '@/app/components/guestpagecomponents/SuccessStoriesBusiOwn';

const BusinessOwnersPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <IntroductionBusiOwn />
      <BusinessRegistrationBusiOwn />
      <ProfileCreationBusiOwn />
      <ShowcaseYourBusinessBusiOwn />
      <NetworkingCollaborationBusiOwn />
      <MarketingPromotionBusiOwn />
      <FundingAndFinancialResourcesBusiOwn />
      <EducationalResourcesBusiOwn />
      <SuccessStoriesBusiOwn />
      <CommunitySupportBusiOwn />
      <ContactSupportBusiOwn />
    </div>
  );
};

export default BusinessOwnersPage;
