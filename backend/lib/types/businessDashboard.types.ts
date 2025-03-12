import { mapToDto } from '../utils/mapper';

export interface BusinessMetricsDb {
  id: string;
  business_id: string;
  metric_type: 'REVENUE' | 'ORDERS' | 'CUSTOMERS' | 'PRODUCTS' | 'VIEWS';
  value: number;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  date: string;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessMetricsDto {
  id: string;
  businessId: string;
  metricType: 'REVENUE' | 'ORDERS' | 'CUSTOMERS' | 'PRODUCTS' | 'VIEWS';
  value: number;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  date: Date;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessReportDb {
  id: string;
  business_id: string;
  report_type: 'SALES' | 'INVENTORY' | 'CUSTOMERS' | 'ANALYTICS';
  title: string;
  description: string | null;
  data: string;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessReportDto {
  id: string;
  businessId: string;
  reportType: 'SALES' | 'INVENTORY' | 'CUSTOMERS' | 'ANALYTICS';
  title: string;
  description: string | null;
  data: Record<string, any>;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessGoalDb {
  id: string;
  business_id: string;
  title: string;
  description: string | null;
  target_value: number;
  current_value: number;
  start_date: string;
  end_date: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  created_at: string;
  updated_at: string;
}

export interface BusinessGoalDto {
  id: string;
  businessId: string;
  title: string;
  description: string | null;
  targetValue: number;
  currentValue: number;
  startDate: Date;
  endDate: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessInsightDb {
  id: string;
  business_id: string;
  type: 'TREND' | 'RECOMMENDATION' | 'ALERT';
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  data: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessInsightDto {
  id: string;
  businessId: string;
  type: 'TREND' | 'RECOMMENDATION' | 'ALERT';
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export function toBusinessMetricsDto(db: BusinessMetricsDb): BusinessMetricsDto {
  return {
    id: db.id,
    businessId: db.business_id,
    metricType: db.metric_type,
    value: db.value,
    period: db.period,
    date: new Date(db.date),
    metadata: db.metadata ? JSON.parse(db.metadata) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toBusinessReportDto(db: BusinessReportDb): BusinessReportDto {
  return mapToDto<BusinessReportDto>(db, {
    dateFields: ['generatedAt', 'createdAt', 'updatedAt'],
    jsonFields: ['data']
  });
}

export function toBusinessGoalDto(db: BusinessGoalDb): BusinessGoalDto {
  return mapToDto<BusinessGoalDto>(db, {
    dateFields: ['startDate', 'endDate', 'createdAt', 'updatedAt']
  });
}

export function toBusinessInsightDto(db: BusinessInsightDb): BusinessInsightDto {
  return mapToDto<BusinessInsightDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['data']
  });
}