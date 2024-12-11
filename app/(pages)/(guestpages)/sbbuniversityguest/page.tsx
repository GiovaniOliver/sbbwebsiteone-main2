'use client'

import CommunityEngagementSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/CommunityEngagementSbbUni';
import ContactSupport from '@/app/components/guestpagecomponents/sbbuniversitycomponents/ContactSupportSbbUni';
import CourseOfferingsSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/CourseOfferingsSbbUni';
import CourseScheduleRegistrationSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/CourseScheduleRegistrationSbbUni';
import FacultyInstructorsSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/FacultyInstructorsSbbUni';
import Head from 'next/head';
import IntroductionSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/IntroductionSbbUni';
import LearningResourcesSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/LearningResourcesSbbUni';
import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import PartnershipsCollaborationsSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/PartnershipsCollaborationsSbbUni';
import React from 'react';
import StudentSuccessStoriesSbbUni from '@/app/components/guestpagecomponents/sbbuniversitycomponents/StudentSuccessStoriesSbbUni';

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
