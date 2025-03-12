import { mapToDto } from '../utils/mapper';

export interface DaoTreasuryDb {
  id: string;
  dao_id: string;
  name: string;
  description: string | null;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DaoTreasuryDto {
  id: string;
  daoId: string;
  name: string;
  description: string | null;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TreasuryTransactionDb {
  id: string;
  treasury_id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  currency: string;
  description: string | null;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  from_address: string | null;
  to_address: string | null;
  transaction_hash: string | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface TreasuryTransactionDto {
  id: string;
  treasuryId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  currency: string;
  description: string | null;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  fromAddress: string | null;
  toAddress: string | null;
  transactionHash: string | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TreasuryBudgetDb {
  id: string;
  treasury_id: string;
  name: string;
  description: string | null;
  amount: number;
  currency: string;
  start_date: string;
  end_date: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}

export interface TreasuryBudgetDto {
  id: string;
  treasuryId: string;
  name: string;
  description: string | null;
  amount: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

export interface TreasuryAssetDb {
  id: string;
  treasury_id: string;
  type: 'TOKEN' | 'NFT' | 'OTHER';
  name: string;
  symbol: string | null;
  amount: number;
  contract_address: string | null;
  token_id: string | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface TreasuryAssetDto {
  id: string;
  treasuryId: string;
  type: 'TOKEN' | 'NFT' | 'OTHER';
  name: string;
  symbol: string | null;
  amount: number;
  contractAddress: string | null;
  tokenId: string | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toDaoTreasuryDto(db: DaoTreasuryDb): DaoTreasuryDto {
  return mapToDto<DaoTreasuryDto>(db, {
    dateFields: ['createdAt', 'updatedAt']
  });
}

export function toTreasuryTransactionDto(db: TreasuryTransactionDb): TreasuryTransactionDto {
  return mapToDto<TreasuryTransactionDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}

export function toTreasuryBudgetDto(db: TreasuryBudgetDb): TreasuryBudgetDto {
  return mapToDto<TreasuryBudgetDto>(db, {
    dateFields: ['startDate', 'endDate', 'createdAt', 'updatedAt']
  });
}

export function toTreasuryAssetDto(db: TreasuryAssetDb): TreasuryAssetDto {
  return mapToDto<TreasuryAssetDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}