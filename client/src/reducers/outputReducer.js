export default function reducer(state = 
  {
    debtors: null,
    friendsInfo: null
  }, action) {
  switch (action.type) {
  case 'SET_DEBTORS': {
    return {...state, debtors: action.payload};
  }
  case 'SET_FRIENDSINFO': {
    return {...state, friendsInfo: action.payload};
  }
  default: {
    return state;
  }
  }
}