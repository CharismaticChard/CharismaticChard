export default function reducer(state = 
  {
    history: false,
    input: false, 
    output: false, 
    confirmation: false
  }, action) {
  switch (action.type) {
  case 'HISTORY': {
    return {...state, history: action.payload};
  }
  case 'INPUT-LOADING': {
    return {...state, input: action.payload};
  }
  case 'OUTPUT-LOADING': {
    return {...state, output: action.payload};
  }
  case 'CONFIRMATION-LOADING': {
    return {...state, confirmation: action.payload};
  }
  default: {
    return state;
  }
  }
}