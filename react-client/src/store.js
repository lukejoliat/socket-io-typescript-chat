import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';
const defaultState = {
  drawerIsOpen: false,
  dialogIsOpen: true,
  user: {}
};
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, defaultState, enhancers);
export default store;
