export const SELECT_OBJECT_ITEM = 'selected_collection_item/select';

const initialState = {
  itemId: '',
  itemLinks: '',
  collectionIndex: null
};

// reducer
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SELECT_OBJECT_ITEM:
      return {
        ...state,
        itemId: payload.itemId,
        itemLinks: payload.itemLinks,
        collectionIndex: payload.collectionIndex
      };
    default:
      return state;
  }
};

// action
export const selectCollectionItem = (itemId, collectionIndex, itemLinks) => {
  return {
    type: SELECT_OBJECT_ITEM,
    payload: {
      itemId,
      itemLinks,
      collectionIndex
    }
  };
};
