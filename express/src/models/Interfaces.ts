export interface Merchant {
  id?: number;
  name: string;
}

export interface User {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface UserHistory {
  id?: number;
  created_at?: Date;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  user_id: number;
}

export interface PaymentMethod {
  id?: number;
  name_on_card: string;
  card_number: string;
  expiration_date: string;
  cvv: number;
  merchant_id: number;
  user_id: number;
}

export interface Product {
  id?: number;
  image: string;
  image_id: number;
  name: string;
  description: string;
  price: number;
  merchant_id?: number;
}

export interface Order {
  id?: number;
  user_id: number;
  payment_method_id: number;
  order_date: Date;
  total_amount: number;
  status: 'pending' | 'completed' | 'shipped' | string; // You can add more statuses if needed.
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_time_of_order: number;
  discount_amount?: number; // Optional since it has a default value
  discount_reason?: string; // Optional as it may not always be provided
}