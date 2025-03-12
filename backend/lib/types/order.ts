import { UserDb, User, toUser } from './user';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';

export interface OrderDb {
  id: string;
  buyer_id: string | null;
  product_id: string | null;
  status: OrderStatus;
  quantity: number;
  total_amount: number | null;
  created_at: Date;
}

export interface Order {
  id: string;
  buyerId: string | null;
  productId: string | null;
  status: OrderStatus;
  quantity: number;
  totalAmount: number | null;
  createdAt: Date;
}

export interface OrderDbWithRelations extends OrderDb {
  buyer: UserDb;
}

export interface OrderWithRelations extends Order {
  buyer: User;
}

export function toOrder(db: OrderDb): Order {
  return {
    id: db.id,
    buyerId: db.buyer_id,
    productId: db.product_id,
    status: db.status,
    quantity: db.quantity,
    totalAmount: Number(db.total_amount), // Convert from numeric to number
    createdAt: db.created_at
  };
}

export function toOrderWithRelations(db: OrderDbWithRelations): OrderWithRelations {
  return {
    ...toOrder(db),
    buyer: toUser(db.buyer)
  };
} 