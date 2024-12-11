import BusinessRegistrationBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/BusinessRegistrationBusiOwn';
import CommunitySupportBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/CommunitySupportBusiOwn';
import ContactSupportBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/ContactSupportBusiOwn';
import EducationalResourcesBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/EducationalResourcesBusiOwn';
import FundingAndFinancialResourcesBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/FundingAndFinancialResourcesBusiOwn';
import IntroductionBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/IntroductionBusiOwn';
import MarketingPromotionBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/MarketingPromotionBusiOwn';
import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import NetworkingCollaborationBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/NetworkingCollaborationBusiOwn';
import ProfileCreationBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/ProfileCreationBusiOwn';
import React from 'react';
import ShowcaseYourBusinessBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/ShowcaseYourBusinessBusiOwn';
import SuccessStoriesBusiOwn from '@/app/components/guestpagecomponents/busownercomponents/SuccessStoriesBusiOwn';

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
