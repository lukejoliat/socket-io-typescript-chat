import { combineReducers } from 'redux';
import drawerIsOpen from './drawer';
import dialogIsOpen from './dialog';
import user from './user';
import messages from './messages';
const rootReducer = combineReducers({
  drawerIsOpen,
  dialogIsOpen,
  user,
  messages
});
export default rootReducer;
