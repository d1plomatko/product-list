import {combineReducers} from "redux";
import {productReducer} from "./slices";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    productReducer,
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export {
    setupStore
}