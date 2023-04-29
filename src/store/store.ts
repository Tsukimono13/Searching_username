import {configureStore} from "@reduxjs/toolkit";
import {githubApi} from "store/github/github.api";
import {setupListeners} from '@reduxjs/toolkit/query'
import {githubReducer} from "store/github/github.slice";

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        github: githubReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware)
})

setupListeners(store.dispatch)
export type RootStateType = ReturnType<typeof store.getState>