import { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  quantity: number;
  options: string[];
}
export interface CartState {
  cartItems: CartItem[];
  open: boolean;
}
export type CartAction = PayloadAction<{
  id: CartItem['id'];
  quantity?: CartItem['quantity'];
  options: CartItem['options'];
  newOptions?: CartItem['options'];
}>;
