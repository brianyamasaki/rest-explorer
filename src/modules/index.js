import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import orgList from './fetchOrgs';
import orgDetails from './fetchOrgDetails';
import collection from './fetchCollection';
import collectionDetails from './fetchCollectionDetails';
import collectionItems from './fetchCollectionItems';
import itemDetails from './fetchItemDetails';
import facets from './fetchFacets';
import facetDetails from './fetchFacetDetails';
import narrators from './fetchNarrators';
import narratorDetails from './fetchNarratorDetails';

export default combineReducers({
  router: routerReducer,
  counter,
  orgList,
  orgDetails,
  collection,
  collectionDetails,
  collectionItems,
  itemDetails,
  facets,
  facetDetails,
  narrators,
  narratorDetails
});
