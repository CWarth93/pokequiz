import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer.js';
import { rootSaga } from './root-saga.js';

const middleware = getDefaultMiddleware({ thunk: false });

if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);

  const logger = createLogger({
    predicate: (_, { type }) => type !== HYDRATE,
  });

  middleware.push(logger);
}

const makeStore = () => {
  const sagaMiddleWare = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...middleware, sagaMiddleWare],
  });

  store.sagaTask = sagaMiddleWare.run(rootSaga);

  return store;
};

const wrapper = createWrapper(makeStore);

export { wrapper, makeStore };
