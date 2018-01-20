import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import orgList from './fetchOrgs';
import orgDetails from './fetchOrgDetails';
import collection from './fetchCollection';
import collectionDetails from './fetchCollectionDetails';
import collectionItems from './fetchCollectionItems';
import selectedCollectionItem from './selectedCollectionItem';

export default combineReducers({
  router: routerReducer,
  counter,
  orgList,
  orgDetails,
  collection,
  collectionDetails,
  collectionItems,
  selectedCollectionItem
});
