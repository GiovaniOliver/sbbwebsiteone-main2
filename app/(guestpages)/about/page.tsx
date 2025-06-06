// pages/about.tsx

import CommunityDevelopment from '@/app/components/guestpagecomponents/CommunityDevelopment';
import CommunitySupport from '@/app/components/guestpagecomponents/CommunitySupport';
import ContactUs from '@/app/components/guestpagecomponents/ContactUs';
import DecentralizedGovernance from '@/app/components/guestpagecomponents/DecentralizedGovernance';
import EducationalFocus from '@/app/components/guestpagecomponents/EducationalFocus';
import EmpoweringBusinesses from '@/app/components/guestpagecomponents/EmpoweringBusinesses';
import Introduction from '@/app/components/guestpagecomponents/Introduction';
import React from 'react';
import Team from '@/app/components/guestpagecomponents/Team';
import Vision from '@/app/components/guestpagecomponents/Vision';

export default function About() {
    return (
        <>
            <Introduction />
            <Vision />
            <EmpoweringBusinesses />
            <CommunityDevelopment />
            <DecentralizedGovernance />
            <EducationalFocus />
            <Team />
            <CommunitySupport />
            <ContactUs />
        </>
    );
}
