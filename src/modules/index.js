import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import orgList from './fetchOrgs';
import orgDetails from './fetchOrgDetails';
import children from './fetchChildren';

export default combineReducers({
  router: routerReducer,
  counter,
  orgList,
  orgDetails,
  children
});
