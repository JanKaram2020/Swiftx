import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  quantity: number;
  options: any;
}
interface CartState {
  cartItems: CartItem[];
  open: boolean;
}
const initialState: CartState = {
  cartItems: [
    // {
    //     id: "3f60de24-1815-4d88-a8dc-5ceda3f41bdc",
    //     name: "Air Jordan 1 Mid",
    //     category: "Men's Shoes",
    //     price: 115,
    //     image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/i1-d2f41ddc-a08e-443a-8eb0-6960ebb4a408/air-jordan-1-mid-shoe-1zMCFJ.jpg",
    //     quantity: 1,
    //     includedInSum: false,
    // },
    // {
    //     id: "d52fd362-1080-46b3-a43c-d64f7a6825ab",
    //     name: "Nike Air Zoom-Type",
    //     category: "Men's Shoes",
    //     price: 150,
    //     image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/5c1e3a90-b2b7-479c-b567-3b50903cf9da/air-zoom-type-mens-shoe-PZR40V.jpg",
    //     quantity: 3,
    //     includedInSum: true,
    // },
  ],
  open: false,
};
const equals = (a: any[], b: any[]) => JSON.stringify(a) === JSON.stringify(b);
const getItemIndex = (
  cartItems: CartItem[],
  idToFind: string,
  optionToFind: string
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
    addToCart(state, action: PayloadAction<{ id: string; options?: any }>) {
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
    removeFromCart(state, action: PayloadAction<{ id: string; options: any }>) {
      const cartItems = state.cartItems.filter((item) => {
        if (
          item.id === action.payload.id &&
          !equals(item.options, action.payload.options)
        ) {
          return true;
        }
        return false;
      });
      return { open: state.open, cartItems };
      // state.cartItems.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity(
      state,
      action: PayloadAction<{ id: string; options: any }>
    ) {
      const itemIndex = getItemIndex(
        state.cartItems,
        action.payload.id,
        action.payload.options
      );
      state.cartItems[itemIndex].quantity += 1;
    },
    decrementQuantity(
      state,
      action: PayloadAction<{ id: string; options: any }>
    ) {
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
    changeOption(
      state,
      action: PayloadAction<{ id: string; options: any; newOptions: any }>
    ) {
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
