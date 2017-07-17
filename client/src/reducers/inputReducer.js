export default function reducer(state = {numbers: 0, name: 'kai', inputs: {}}, action) {
  switch (action.type) {
  case 'SET_INPUTS': {
    return {...state, inputs: action.payload};
  }
  default: {
    return state;
  }
  }
}