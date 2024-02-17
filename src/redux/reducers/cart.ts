import { IBook } from '@/types/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  cart: IBook[];
}

const initialState: CartState = {
  cart: [],
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IBook>) => {
      const character = action.payload;

      if (!state.cart.find((cartContent) => cartContent.id === character.id))
        state.cart.push(character);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const characterIndex = state.cart.findIndex(
        ({ id }) => id === action.payload,
      );
      state.cart.splice(characterIndex, 1);
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cart.actions;
export const cartReducer = cart.reducer;
