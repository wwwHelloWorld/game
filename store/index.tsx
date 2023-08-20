import { combineReducers } from '@reduxjs/toolkit';
import gameDataReducer from './reducers';

const rootReducer = combineReducers({
  gameData: gameDataReducer,
});

export default rootReducer;
