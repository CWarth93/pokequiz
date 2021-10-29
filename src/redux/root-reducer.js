import { combineReducers } from '@reduxjs/toolkit';
import {
  reducer as gameReducer,
  slice as gameSlice,
} from 'features/game/game-reducer.js';
import { HYDRATE } from 'next-redux-wrapper';

const combinedReducer = combineReducers({
  [gameSlice]: gameReducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.game) {
      nextState.game = state.game;
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const rootState = rootReducer(undefined, {});

export { rootReducer, rootState };
