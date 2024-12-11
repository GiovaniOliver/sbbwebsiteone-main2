import CollaborateAndGrow from "@/app/components/guestpagecomponents/howitworkscomponents/CollaborateAndGrow";
import ConnectCommunitySection from "@/app/components/guestpagecomponents/howitworkscomponents/ConnectCommunitySection";
import EngageWithShortVideos from "@/app/components/guestpagecomponents/howitworkscomponents/EngageWithShortVideos";
import ExploreBlackBusinesses from "@/app/components/guestpagecomponents/howitworkscomponents/ExploreBlackBusinesses";
import GovernanceAndDecisionMaking from "@/app/components/guestpagecomponents/howitworkscomponents/GovernanceAndDecisionMaking";
import Introductionhowitwork from "@/app/components/guestpagecomponents/howitworkscomponents/Introductionhowitworks";
import JoinEcosystemSection from "@/app/components/guestpagecomponents/howitworkscomponents/JoinEcosystemSection";
import { Navbar } from '@/app/components/guestpagecomponents/homecomponents/NavbarGuest';
import ParticipateInCommunityPrograms from "@/app/components/guestpagecomponents/howitworkscomponents/ParticipateInCommunityPrograms";
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