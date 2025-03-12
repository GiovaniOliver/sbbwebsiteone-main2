import { UserDb, User, toUser } from './user';
import { OrderDb, Order, toOrder } from './order';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'bank_transfer' | 'crypto' | 'other';

export interface PaymentHistoryDb {
  id: string;
  user_id: string | null;
  order_id: string | null;
  amount: number | null;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | null;
  created_at: Date;
}

export interface PaymentHistory {
  id: string;
  userId: string | null;
  orderId: string | null;
  amount: number | null;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  createdAt: Date;
}

export interface PaymentHistoryDbWithRelations extends PaymentHistoryDb {
  user: UserDb;
  order: OrderDb;
}

export interface PaymentHistoryWithRelations extends PaymentHistory {
  user: User;
  order: Order;
}

export function toPaymentHistory(db: PaymentHistoryDb): PaymentHistory {
  return {
    id: db.id,
    userId: db.user_id,
    orderId: db.order_id,
    amount: Number(db.amount), // Convert from numeric to number
    paymentStatus: db.payment_status,
    paymentMethod: db.payment_method,
    createdAt: db.created_at
  };
}

export function toPaymentHistoryWithRelations(db: PaymentHistoryDbWithRelations): PaymentHistoryWithRelations {
  return {
    ...toPaymentHistory(db),
    user: toUser(db.user),
    order: toOrder(db.order)
  };
} 