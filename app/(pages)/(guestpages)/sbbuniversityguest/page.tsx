'use client'

import CommunityEngagementSbbUni from '@/app/components/guestpagecomponents/CommunityEngagementSbbUni';
import ContactSupport from '@/app/components/guestpagecomponents/ContactSupportSbbUni';
import CourseOfferingsSbbUni from '@/app/components/guestpagecomponents/CourseOfferingsSbbUni';
import CourseScheduleRegistrationSbbUni from '@/app/components/guestpagecomponents/CourseScheduleRegistrationSbbUni';
import FacultyInstructorsSbbUni from '@/app/components/guestpagecomponents/FacultyInstructorsSbbUni';
import Head from 'next/head';
import IntroductionSbbUni from '@/app/components/guestpagecomponents/IntroductionSbbUni';
import LearningResourcesSbbUni from '@/app/components/guestpagecomponents/LearningResourcesSbbUni';
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import PartnershipsCollaborationsSbbUni from '@/app/components/guestpagecomponents/PartnershipsCollaborationsSbbUni';
import React from 'react';
import StudentSuccessStoriesSbbUni from '@/app/components/guestpagecomponents/StudentSuccessStoriesSbbUni';

const SBBUniversity: React.FC = () => {
    return (
        <React.Fragment>
            <Head>
                <title>SBB University</title>
                <meta name="description" content="SBB University Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <IntroductionSbbUni />
            <CourseOfferingsSbbUni />
            <CourseScheduleRegistrationSbbUni />
            <LearningResourcesSbbUni />
            <FacultyInstructorsSbbUni />
            <StudentSuccessStoriesSbbUni />
            <CommunityEngagementSbbUni />
            <PartnershipsCollaborationsSbbUni />
            <ContactSupport/>
            
        </React.Fragment>
    );
};

export default SBBUniversity;
