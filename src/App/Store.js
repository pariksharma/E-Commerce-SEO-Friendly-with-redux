import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ItemReducer  from "../Redux/handleCart";
import UserReducer from "../Redux/handleUser"


const combine = combineReducers({
    item: ItemReducer,
    user: UserReducer,
})

export const store = configureStore({
    reducer: combine
})