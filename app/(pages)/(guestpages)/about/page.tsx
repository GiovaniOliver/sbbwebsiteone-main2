// pages/about.tsx

import CommunityDevelopment from '@/app/components/guestpagecomponents/aboutcomponents/CommunityDevelopment';
import CommunitySupport from '@/app/components/guestpagecomponents/aboutcomponents/CommunitySupport';
import ContactUs from '@/app/components/guestpagecomponents/aboutcomponents/ContactUs';
import DecentralizedGovernance from '@/app/components/guestpagecomponents/aboutcomponents/DecentralizedGovernance';
import EducationalFocus from '@/app/components/guestpagecomponents/aboutcomponents/EducationalFocus';
import EmpoweringBusinesses from '@/app/components/guestpagecomponents/aboutcomponents/EmpoweringBusinesses';
import Footer from '@/app/components/footer';
import Introduction from '@/app/components/guestpagecomponents/aboutcomponents/Introduction';
import { Navbar } from '@/app/components/navbar';
import React from 'react';
import Team from '@/app/components/guestpagecomponents/aboutcomponents/Team';
import Vision from '@/app/components/guestpagecomponents/aboutcomponents/Vision';

const About: React.FC = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Introduction />
            <Vision />
            <EmpoweringBusinesses />
            <CommunityDevelopment />
            <DecentralizedGovernance />
            <EducationalFocus />
            <Team />
            <CommunitySupport />
            <ContactUs />
            <Footer />
        </React.Fragment>
    );
};

export default About;
