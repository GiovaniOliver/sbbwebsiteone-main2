import CollaborateAndGrow from "@/app/components/guestpagecomponents/CollaborateAndGrow";
import ConnectCommunitySection from "@/app/components/guestpagecomponents/ConnectCommunitySection";
import EngageWithShortVideos from "@/app/components/guestpagecomponents/EngageWithShortVideos";
import ExploreBlackBusinesses from "@/app/components/guestpagecomponents/ExploreBlackBusinesses";
import GovernanceAndDecisionMaking from "@/app/components/guestpagecomponents/GovernanceAndDecisionMaking";
import Introductionhowitwork from "@/app/components/guestpagecomponents/Introductionhowitworks";
import JoinEcosystemSection from "@/app/components/guestpagecomponents/JoinEcosystemSection";
import { Navbar } from '@/app/components/guestpagecomponents/NavbarGuest';
import ParticipateInCommunityPrograms from "@/app/components/guestpagecomponents/ParticipateInCommunityPrograms";
import React from 'react';

const Howitworkspage: React.FC = () => {
  return (
      <React.Fragment>
          <Navbar />
          <Introductionhowitwork/>
          <CollaborateAndGrow/>
          <ConnectCommunitySection/>
          <EngageWithShortVideos/>
          <GovernanceAndDecisionMaking/>
          <JoinEcosystemSection/>
          <ParticipateInCommunityPrograms/>
          <ExploreBlackBusinesses/>
      </React.Fragment>
  );
};     


export default Howitworkspage