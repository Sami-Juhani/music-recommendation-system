// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
// Import other reducers...

const rootReducer = combineReducers({
  player: playerReducer,
  // other reducers...
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
