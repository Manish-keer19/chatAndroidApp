import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/User/UserSlice"

export const store = configureStore({
  reducer: {
    User:userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch