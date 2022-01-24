import { createSlice } from '@reduxjs/toolkit';
import { CartItem, CartState, CartAction } from 'types/cartStore';

const initialState: CartState = {
  cartItems: [],
  open: false,
};
const equals = (a: CartItem['options'], b: CartItem['options']): boolean =>
  JSON.stringify(a) === JSON.stringify(b);
const getItemIndex = (
  cartItems: CartItem[],
  idToFind: CartItem['id'],
  optionToFind: CartItem['options']
): number => {
  const ids = cartItems.map((item) => item.id + JSON.stringify(item.options));
  return ids.indexOf(idToFind + JSON.stringify(optionToFind));
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart(state) {
      state.open = true;
    },
    toggleCart(state) {
      state.open = !state.open;
    },
    closeCart(state) {
      state.open = false;
    },
    addToCart(state, action: CartAction) {
      const itemIndex = getItemIndex(
        state.cartItems,
        action.payload.id,
        action.payload.options
      );
      if (itemIndex && itemIndex < 0)
        state.cartItems.push({
          id: action.payload.id,
          quantity: 1,
          options: action.payload.options,
        });
      else {
        state.cartItems[itemIndex].quantity++;
      }
    },
    removeFromCart(state, action: CartAction) {
      const itemIndex = getItemIndex(
        state.cartItems,
        action.payload.id,
        action.payload.options
      );
      state.cartItems.splice(itemIndex, 1);
    },
    incrementQuantity(state, action: CartAction) {
      const itemIndex = getItemIndex(
        state.cartItems,
        action.payload.id,
        action.payload.options
      );
      state.cartItems[itemIndex].quantity += 1;
    },
    decrementQuantity(state, action: CartAction) {
      const itemIndex = getItemIndex(
        state.cartItems,
        action.payload.id,
        action.payload.options
      );

      if (state.cartItems[itemIndex].quantity > 1)
        state.cartItems[itemIndex].quantity -= 1;
      else {
        state.cartItems.splice(itemIndex, 1);
      }
    },
    changeOption(state, action: CartAction) {
      if (!action.payload.newOptions) return;
      if (equals(action.payload.options, action.payload.newOptions)) {
        return;
      }
      const oldItemIndex = getItemIndex(
        state.cartItems,
        action.payload.id,
        action.payload.options
      );
      const newItemIndex = getItemIndex(
        state.cartItems,
        action.payload.id,
        action.payload.newOptions
      );
      if (newItemIndex && newItemIndex < 0) {
        state.cartItems[oldItemIndex].options = action.payload.newOptions;
      } else {
        state.cartItems[newItemIndex].quantity +=
          state.cartItems[oldItemIndex].quantity;
        state.cartItems.splice(oldItemIndex, 1);
      }
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  changeOption,
} = cartSlice.actions;
export default cartSlice.reducer;
