import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Items: []
}

export const ItemSlice = createSlice({
    name: "cartItem",
    initialState,
    reducers: {
        ADDItem: (state, action) => {            
            const item = {
                id: action.payload.id,
                value: action.payload.product
            }
            state.Items.push(item)
        },
        DELItem: (state, action) => {
            state.Items = state.Items.filter((item) => action.payload.id !== item.id)
        }
    }
})

export const { ADDItem, DELItem } = ItemSlice.actions

export default ItemSlice.reducer