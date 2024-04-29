import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: ""
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        AddUser: (state, action) => {
            // console.log("done")
            // const user = {
            //     value: action.payload
            // }
            state.users = action.payload;
        }
    }
})

export const { AddUser } = UserSlice.actions

export default UserSlice.reducer