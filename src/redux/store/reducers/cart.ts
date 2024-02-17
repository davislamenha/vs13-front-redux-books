import { IBook } from '@/types/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ICartBook extends IBook {
  quantity: number;
}

interface CartState {
  cart: ICartBook[];
  subtotal: number;
  freight: number;
  total: number;
}

const initialState: CartState = {
  cart: [],
  subtotal: 0,
  freight: 0,
  total: 0,
};

const calculateSubtotal = (cart: ICartBook[]) => {
  return cart.reduce(
    (acc, book) => acc + book.retailPrice.amount * book.quantity,
    0,
  );
};

const calculateFreight = (subtotal: number) => {
  return subtotal * 0.2;
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const bookInCart = state.cart.find((book) => book.id === id);
      if (bookInCart) {
        bookInCart.quantity = quantity;
        state.subtotal = calculateSubtotal(state.cart);
        state.freight = calculateFreight(state.subtotal);
        state.total = state.subtotal + state.freight;
      }
    },
    addToCart: (state, action: PayloadAction<ICartBook>) => {
      const book = action.payload;
      const alreadyExist = state.cart.find(
        (bookInCart) => bookInCart.id === book.id,
      );
      if (alreadyExist) {
        alreadyExist.quantity += book.quantity;
      } else {
        state.cart.push(book);
      }
      state.subtotal = calculateSubtotal(state.cart);
      state.freight = calculateFreight(state.subtotal);
      state.total = state.subtotal + state.freight;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const bookIndex = state.cart.findIndex(({ id }) => id === action.payload);
      if (bookIndex !== -1) {
        state.cart.splice(bookIndex, 1);
        state.subtotal = calculateSubtotal(state.cart);
        state.freight = calculateFreight(state.subtotal);
        state.total = state.subtotal + state.freight;
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.subtotal = 0;
      state.freight = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCart, updateQuantity } =
  cart.actions;
export const cartReducer = cart.reducer;
