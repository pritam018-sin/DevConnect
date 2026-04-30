import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

// createSlice returns an object containing reducer and action creators
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

// export both action creators by name
export const { increment, decrement } = counterSlice.actions;

// default export the generated reducer so it can be added to the store
export default counterSlice.reducer;