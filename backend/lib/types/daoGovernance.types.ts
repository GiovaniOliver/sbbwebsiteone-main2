import { mapToDto } from '../utils/mapper';

export interface DaoDb {
  id: string;
  name: string;
  description: string;
  governance_token: string;
  voting_period: number;
  minimum_holding_required: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface DaoDto {
  id: string;
  name: string;
  description: string;
  governanceToken: string;
  votingPeriod: number;
  minimumHoldingRequired: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoMemberDb {
  id: string;
  dao_id: string;
  user_id: string;
  delegate_to: string | null;
  voting_power: number;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface DaoMemberDto {
  id: string;
  daoId: string;
  userId: string;
  delegateTo: string | null;
  votingPower: number;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProposalDb {
  id: string;
  dao_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: 'DRAFT' | 'ACTIVE' | 'PASSED' | 'FAILED' | 'EXECUTED' | 'CANCELLED';
  created_by: string;
  executed_by: string | null;
  executed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProposalDto {
  id: string;
  daoId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: 'DRAFT' | 'ACTIVE' | 'PASSED' | 'FAILED' | 'EXECUTED' | 'CANCELLED';
  createdBy: string;
  executedBy: string | null;
  executedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoteDb {
  id: string;
  proposal_id: string;
  user_id: string;
  vote_type: 'FOR' | 'AGAINST' | 'ABSTAIN';
  voting_power: number;
  created_at: string;
}

export interface VoteDto {
  id: string;
  proposalId: string;
  userId: string;
  voteType: 'FOR' | 'AGAINST' | 'ABSTAIN';
  votingPower: number;
  createdAt: Date;
}

export function toDaoDto(db: DaoDb): DaoDto {
  return mapToDto<DaoDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}

export function toProposalDto(db: ProposalDb): ProposalDto {
  return mapToDto<ProposalDto>(db, {
    dateFields: ['startTime', 'endTime', 'executedAt', 'createdAt', 'updatedAt']
  });
}

export interface DaoGovernanceDb {
  id: string;
  dao_id: string;
  name: string;
  description: string;
  voting_period_days: number;
  quorum_percentage: number;
  approval_threshold_percentage: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DaoGovernanceDto {
  id: string;
  daoId: string;
  name: string;
  description: string;
  votingPeriodDays: number;
  quorumPercentage: number;
  approvalThresholdPercentage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoProposalDb {
  id: string;
  dao_id: string;
  proposer_id: string;
  title: string;
  description: string;
  proposal_type: 'GENERAL' | 'FUNDING' | 'MEMBERSHIP' | 'GOVERNANCE';
  status: 'DRAFT' | 'ACTIVE' | 'PASSED' | 'FAILED' | 'EXECUTED' | 'CANCELLED';
  start_date: string;
  end_date: string;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoProposalDto {
  id: string;
  daoId: string;
  proposerId: string;
  title: string;
  description: string;
  proposalType: 'GENERAL' | 'FUNDING' | 'MEMBERSHIP' | 'GOVERNANCE';
  status: 'DRAFT' | 'ACTIVE' | 'PASSED' | 'FAILED' | 'EXECUTED' | 'CANCELLED';
  startDate: Date;
  endDate: Date;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoVoteDb {
  id: string;
  proposal_id: string;
  voter_id: string;
  vote: 'FOR' | 'AGAINST' | 'ABSTAIN';
  voting_power: number;
  reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoVoteDto {
  id: string;
  proposalId: string;
  voterId: string;
  vote: 'FOR' | 'AGAINST' | 'ABSTAIN';
  votingPower: number;
  reason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaoVotingPowerDb {
  id: string;
  dao_id: string;
  user_id: string;
  power: number;
  delegation_from: string | null;
  delegation_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface DaoVotingPowerDto {
  id: string;
  daoId: string;
  userId: string;
  power: number;
  delegationFrom: string | null;
  delegationTo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toDaoGovernanceDto(db: DaoGovernanceDb): DaoGovernanceDto {
  return {
    id: db.id,
    daoId: db.dao_id,
    name: db.name,
    description: db.description,
    votingPeriodDays: db.voting_period_days,
    quorumPercentage: db.quorum_percentage,
    approvalThresholdPercentage: db.approval_threshold_percentage,
    isActive: db.is_active,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toDaoProposalDto(db: DaoProposalDb): DaoProposalDto {
  return mapToDto<DaoProposalDto>(db, {
    dateFields: ['startDate', 'endDate', 'createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}