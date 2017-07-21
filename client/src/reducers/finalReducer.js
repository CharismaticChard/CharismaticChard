export default function reducer(state = 
  {
    splitTotal: 0,
    totalTax: 0,
    totalTip: 0,
    splitName: null,
    splitter: null,
    debtors: []
  }, action) {
  switch (action.type) {
  case 'SET_SPLIT_TOTAL': {
    return {...state, splitTotal: action.payload};
  }
  case 'SET_TOTAL_TAX': {
    return {...state, totalTax: action.payload};
  }
  case 'SET_TOTAL_TIP': {
    return {...state, totalTip: action.payload};
  }
  case 'SET_SPLIT_NAME': {
    return {...state, splitName: action.payload};
  }
  case 'SET_SPLITTER': {
    return {...state, splitter: action.payload };
  }




  case 'SET_SPLITTER_PHONE': {
    return {...state, splitter: {...state.splitter, phone: action.payload}};
  }
  case 'SET_SPLITTER_ITEMS': {
    return {...state, splitter: {...state.splitter, items: action.payload}};
  }
  case 'SET_SPLITTER_DEBTTOTAL': {
    return {...state, splitter: {...state.splitter, debtTotal: action.payload}};
  }
  case 'SET_DEBTORS_TAX': {
    return {...state, splitter: {...state.splitter, tax: action.payload}};
  }
  case 'SET_DEBTORS_TIP': {
    console.log('**********', state);
    return {...state, splitter: {...state.splitter, tip: action.payload}};
  }






  
  case 'SET_DEBTORS': {
    return {...state, debtors: action.payload};
  }







  default: {
    return state;
  }
  }
}