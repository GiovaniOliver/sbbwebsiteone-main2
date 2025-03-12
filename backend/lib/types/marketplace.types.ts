import { mapToDto } from '../utils/mapper';

export interface ProductDb {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  status: 'DRAFT' | 'ACTIVE' | 'SOLD' | 'INACTIVE';
  quantity: number;
  thumbnail_url: string | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductDto {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  status: 'DRAFT' | 'ACTIVE' | 'SOLD' | 'INACTIVE';
  quantity: number;
  thumbnailUrl: string | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImageDb {
  id: string;
  product_id: string;
  url: string;
  order_index: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImageDto {
  id: string;
  productId: string;
  url: string;
  orderIndex: number;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDb {
  id: string;
  buyer_id: string;
  seller_id: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  total_amount: number;
  currency: string;
  shipping_address: string;
  tracking_number: string | null;
  notes: string | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderDto {
  id: string;
  buyerId: string;
  sellerId: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  totalAmount: number;
  currency: string;
  shippingAddress: string;
  trackingNumber: string | null;
  notes: string | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemDb {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItemDto {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductReviewDb {
  id: string;
  product_id: string;
  order_id: string;
  reviewer_id: string;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductReviewDto {
  id: string;
  productId: string;
  orderId: string;
  reviewerId: string;
  rating: number;
  review: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function toProductDto(db: ProductDb): ProductDto {
  return {
    id: db.id,
    sellerId: db.seller_id,
    title: db.title,
    description: db.description,
    price: db.price,
    currency: db.currency,
    category: db.category,
    condition: db.condition,
    status: db.status,
    quantity: db.quantity,
    thumbnailUrl: db.thumbnail_url,
    metadata: db.metadata ? JSON.parse(db.metadata) : null,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at)
  };
}

export function toOrderDto(db: OrderDb): OrderDto {
  return mapToDto<OrderDto>(db, {
    dateFields: ['createdAt', 'updatedAt'],
    jsonFields: ['metadata']
  });
}