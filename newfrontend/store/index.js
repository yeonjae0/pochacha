import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const initStore = () => {
  const store = configureStore(rootReducer);

  return store;
};

export default initStore;
