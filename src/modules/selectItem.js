import { createSelector } from 'reselect';

const getCollectionDetails = state => state.collectionDetails;

const getCollectionItems = state => state.collectionItems.items;

const getSelection = state => state.selectedCollectionItem;

export const getSelectedItem = createSelector(
  [getCollectionDetails, getCollectionItems, getSelection],
  (collectionDetails, items, selected) => {
    return {
      item: items[selected.collectionIndex],
      itemId: selected.itemId,
      links: selected.itemLinks,
      collectionId: collectionDetails.id
    };
  }
);
