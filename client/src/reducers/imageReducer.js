export default function reducer(state = 
  {
    imageItem: []
  }, action) {
  switch (action.type) {
  case 'IMAGE-ITEM': {
    return {...state, imageItem: [...state.imageItem, action.payload]};
  }
  default: {
    return state;
  }
  }
}