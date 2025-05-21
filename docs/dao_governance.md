# DAO Governance System

## Overview

The SBB DAO governance system enables decentralized decision-making by token holders. This document outlines the governance mechanisms, proposal lifecycle, voting processes, and implementation procedures.

## Governance Structure

The SBB DAO governance structure consists of several key components:

1. **Token Holders**: Community members who hold SBB tokens and have voting rights proportional to their holdings
2. **Governance Council**: Elected representatives who oversee proposal implementation
3. **Working Groups**: Specialized teams focused on specific areas (development, marketing, etc.)
4. **Community Forum**: Space for discussion and proposal refinement

## Token System

### Token Distribution

- **Initial Distribution**: Tokens allocated to founding team, early contributors, and community reserve
- **Ongoing Distribution**: Tokens earned through platform participation, community contributions, and tasks
- **Treasury**: Tokens held in reserve for funding proposals and initiatives

### Token Utility

- **Voting Rights**: Ability to vote on governance proposals
- **Proposal Creation**: Right to create new proposals (minimum token threshold required)
- **Staking Rewards**: Ability to stake tokens and earn rewards
- **Platform Benefits**: Access to premium features and reduced fees

## Proposal System

### Proposal Types

1. **Budget Proposals**: Requests for funding from the DAO treasury
2. **Parameter Changes**: Modifications to system parameters or policies
3. **Feature Proposals**: Suggestions for new platform features
4. **Working Group Formation**: Creation of new specialized teams
5. **Governance Changes**: Modifications to the governance system itself

### Proposal Requirements

All proposals must include:

1. **Title**: Clear, concise description
2. **Description**: Detailed explanation of the proposal
3. **Category**: Proposal type classification
4. **Budget**: Required funding (if applicable)
5. **Timeline**: Implementation schedule
6. **Success Metrics**: How to measure outcomes
7. **Team**: Who will implement the proposal

### Proposal Categories

| Category | Required Quorum | Required Majority | Description |
|----------|----------------|------------------|-------------|
| Budget (Small) | 15% | 51% | Proposals requesting < 1,000 tokens |
| Budget (Medium) | 20% | 60% | Proposals requesting 1,000-10,000 tokens |
| Budget (Large) | 25% | 67% | Proposals requesting > 10,000 tokens |
| Parameter Change | 20% | 60% | Changes to system parameters |
| Feature | 15% | 51% | New platform features |
| Working Group | 20% | 60% | Creation of new working groups |
| Governance | 30% | 75% | Changes to governance system |

## Proposal Lifecycle

### 1. Creation

- Token holder creates proposal
- Minimum token requirement enforced
- System validates proposal completeness

### 2. Discussion (7 days)

- Community provides feedback
- Proposer can make amendments
- No formal voting occurs

### 3. Voting (7 days)

- Token holders cast votes (Yes, No, Abstain)
- Voting power proportional to token holdings
- Snapshot taken at voting start to prevent manipulation

### 4. Decision

- System tallies votes
- Proposal passes if both quorum and majority thresholds are met
- Results are published on-chain and on platform

### 5. Implementation

- Passed proposals scheduled for implementation
- Governance Council oversees execution
- Treasury disburses funds if required

### 6. Reporting

- Implementation team provides progress updates
- Success metrics are tracked
- Final report published after completion

## Voting Mechanisms

### Voting Power

- 1 token = 1 voting power
- Staked tokens retain voting rights
- Delegation of voting power is supported

### Voting Options

- **Yes**: Support for the proposal
- **No**: Opposition to the proposal
- **Abstain**: Neutral, counts towards quorum but not outcome

### Vote Privacy

- All votes are visible on-chain
- Voting history is public
- No anonymous voting currently supported

## Technical Implementation

### Smart Contracts

- Proposal Registry Contract: Manages proposal creation and status
- Voting Contract: Handles vote tabulation and results
- Treasury Contract: Controls fund disbursement
- Token Contract: Standard ERC-20 implementation with governance extensions

### On-chain vs. Off-chain

The governance system uses a hybrid approach:

- **On-chain**: Token balances, voting results, proposal outcomes
- **Off-chain**: Proposal discussions, documentation, progress tracking

### Integration with Supabase

The platform synchronizes blockchain data with the Supabase database:

1. Proposals created in the UI are stored in both Supabase and on-chain
2. Votes are recorded on-chain and synced to Supabase
3. Proposal status updates flow bi-directionally

## Reputation System

In addition to token-based voting, the SBB DAO includes a reputation system:

### Reputation Points

- Earned through positive community contributions
- Cannot be transferred or purchased
- Decay over time if not maintained through activity

### Reputation Levels

| Level | Points Required | Benefits |
|-------|----------------|----------|
| 1: Newcomer | 0-999 | Basic participation |
| 2: Contributor | 1,000-4,999 | Create basic proposals |
| 3: Established | 5,000-9,999 | Create medium budget proposals |
| 4: Core | 10,000-24,999 | Create large budget proposals |
| 5: Elder | 25,000+ | Special recognition, mentorship role |

### Reputation Impact

While reputation does not directly affect voting power, it:

- Enables proposal creation at different tiers
- Provides social status in the community
- Qualifies members for certain roles and responsibilities

## Working Groups

The DAO organizes work through specialized Working Groups:

### Core Working Groups

1. **Development**: Platform features and technical improvements
2. **Community**: User engagement and growth
3. **Marketing**: Promotion and outreach
4. **Finance**: Treasury management and financial planning
5. **Governance**: System improvements and dispute resolution

### Working Group Formation

- Created through governance proposals
- Requires clear mission, goals, and KPIs
- Initial leadership appointed by proposal, later elected

### Working Group Funding

- Annual budget allocated through governance
- Quarterly reporting requirements
- Performance reviewed by Governance Council

## Treasury Management

### Fund Sources

- Platform fees
- Token sales
- Donations
- Investment returns

### Fund Allocation

- Development grants
- Marketing initiatives
- Community events
- Contributor compensation
- Operational expenses

### Investment Strategy

- Treasury diversification into stable assets
- Maintenance of reserve requirements
- Conservative growth targets

## Dispute Resolution

### Types of Disputes

1. **Proposal Challenges**: Contestation of proposal outcomes
2. **Fund Misuse**: Allegations of improper treasury usage
3. **Governance Violations**: Breaches of governance procedures
4. **Community Standards**: Violations of community guidelines

### Resolution Process

1. **Reporting**: Issue reported to Governance Council
2. **Investigation**: Council reviews evidence and context
3. **Hearing**: Involved parties present their case
4. **Decision**: Council makes determination
5. **Appeal**: Option to escalate to full community vote

## Conclusion

The SBB DAO governance system provides a robust framework for decentralized decision-making, enabling community members to shape the platform's evolution. By combining token-based voting with reputation mechanisms, the system balances inclusivity with expertise.

This governance model will continue to evolve as the community grows and matures, with all changes subject to the same democratic processes outlined here.

## Appendix

### Governance System Roadmap

| Phase | Timeline | Features |
|-------|----------|----------|
| 1: Foundation | Q1-Q2 2025 | Basic proposal and voting system |
| 2: Expansion | Q3-Q4 2025 | Working groups, reputation system |
| 3: Maturity | Q1-Q2 2026 | Delegation, quadratic voting, improved analytics |
| 4: Autonomy | Q3-Q4 2026 | Full on-chain governance, automated execution |

### Key Governance Functions

```sql
-- Function to create a new proposal
CREATE OR REPLACE FUNCTION create_dao_proposal(
  p_title TEXT,
  p_description TEXT,
  p_proposal_type TEXT,
  p_voting_deadline TIMESTAMPTZ,
  p_budget NUMERIC,
  p_category_id UUID
) RETURNS UUID AS $$
DECLARE
  v_proposal_id UUID;
  v_required_quorum NUMERIC;
  v_required_majority NUMERIC;
BEGIN
  -- Get required quorum and majority from category
  SELECT required_quorum, required_majority
  INTO v_required_quorum, v_required_majority
  FROM dao_proposal_categories
  WHERE id = p_category_id;
  
  -- Create proposal
  INSERT INTO dao_proposals (
    title,
    description,
    creator_id,
    status,
    voting_deadline,
    proposal_type,
    required_quorum,
    required_majority,
    budget,
    category_id
  ) VALUES (
    p_title,
    p_description,
    auth.uid(),
    'pending',
    p_voting_deadline,
    p_proposal_type,
    v_required_quorum,
    v_required_majority,
    p_budget,
    p_category_id
  )
  RETURNING id INTO v_proposal_id;
  
  RETURN v_proposal_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to cast a vote
CREATE OR REPLACE FUNCTION vote_on_proposal(
  p_proposal_id UUID,
  p_vote TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_voting_power NUMERIC;
  v_proposal_status TEXT;
BEGIN
  -- Check if proposal is active
  SELECT status INTO v_proposal_status
  FROM dao_proposals
  WHERE id = p_proposal_id;
  
  IF v_proposal_status != 'active' THEN
    RAISE EXCEPTION 'Proposal is not active for voting';
  END IF;
  
  -- Get user's voting power
  SELECT amount INTO v_voting_power
  FROM dao_tokens
  WHERE holder_id = auth.uid();
  
  -- Record the vote
  INSERT INTO dao_votes (
    proposal_id,
    voter_id,
    vote,
    voting_power
  ) VALUES (
    p_proposal_id,
    auth.uid(),
    p_vote,
    v_voting_power
  )
  ON CONFLICT (proposal_id, voter_id) 
  DO UPDATE SET 
    vote = EXCLUDED.vote,
    voting_power = EXCLUDED.voting_power;
    
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to tally votes and determine result
CREATE OR REPLACE FUNCTION tally_proposal_votes(
  p_proposal_id UUID
) RETURNS JSONB AS $$
DECLARE
  v_result JSONB;
  v_proposal RECORD;
  v_total_votes NUMERIC;
  v_yes_votes NUMERIC;
  v_no_votes NUMERIC;
  v_abstain_votes NUMERIC;
  v_total_possible_votes NUMERIC;
  v_quorum_percentage NUMERIC;
  v_yes_percentage NUMERIC;
BEGIN
  -- Get proposal details
  SELECT * INTO v_proposal
  FROM dao_proposals
  WHERE id = p_proposal_id;
  
  -- Calculate vote totals
  SELECT 
    SUM(CASE WHEN vote = 'yes' THEN voting_power ELSE 0 END),
    SUM(CASE WHEN vote = 'no' THEN voting_power ELSE 0 END),
    SUM(CASE WHEN vote = 'abstain' THEN voting_power ELSE 0 END)
  INTO v_yes_votes, v_no_votes, v_abstain_votes
  FROM dao_votes
  WHERE proposal_id = p_proposal_id;
  
  -- Default to zero if null
  v_yes_votes := COALESCE(v_yes_votes, 0);
  v_no_votes := COALESCE(v_no_votes, 0);
  v_abstain_votes := COALESCE(v_abstain_votes, 0);
  
  v_total_votes := v_yes_votes + v_no_votes + v_abstain_votes;
  
  -- Get total possible votes (all tokens)
  SELECT SUM(amount) INTO v_total_possible_votes
  FROM dao_tokens;
  
  -- Calculate percentages
  v_quorum_percentage := (v_total_votes / v_total_possible_votes) * 100;
  
  IF (v_yes_votes + v_no_votes) > 0 THEN
    v_yes_percentage := (v_yes_votes / (v_yes_votes + v_no_votes)) * 100;
  ELSE
    v_yes_percentage := 0;
  END IF;
  
  -- Determine result
  v_result := jsonb_build_object(
    'votes', jsonb_build_object(
      'yes', v_yes_votes,
      'no', v_no_votes,
      'abstain', v_abstain_votes,
      'total', v_total_votes
    ),
    'percentages', jsonb_build_object(
      'quorum', v_quorum_percentage,
      'yes', v_yes_percentage
    ),
    'thresholds', jsonb_build_object(
      'quorum', v_proposal.required_quorum,
      'majority', v_proposal.required_majority
    ),
    'quorum_reached', v_quorum_percentage >= v_proposal.required_quorum,
    'majority_reached', v_yes_percentage >= v_proposal.required_majority,
    'passed', (v_quorum_percentage >= v_proposal.required_quorum) AND 
              (v_yes_percentage >= v_proposal.required_majority)
  );
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;
```
