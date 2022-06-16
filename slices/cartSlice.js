import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        // actions
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(cartItem => cartItem.id === action.payload.id);
            const newCart = [...state.items];
            if (index >= 0) {
                newCart.splice(index);
            } else {
                console.warn("The product doesn't exits!");
            }
            state.items = newCart;
        },
    }
});

// pull the data from global store
export const selectedItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.items.reduce((total, item) => (total + item.price), 0);

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;