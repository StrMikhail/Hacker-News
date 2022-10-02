import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storiesReducer from "./stories";

const rootReducer = combineReducers({
    stories: storiesReducer,
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}