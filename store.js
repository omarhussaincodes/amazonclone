import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from './slices/cartSlice';

export const appStore = configureStore({
    reducer: {
        cart: cartReducer
    }
})

const makeStore = () => appStore;

export const wrapper = createWrapper(makeStore);