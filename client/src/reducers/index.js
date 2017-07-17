import { combineReducers } from 'redux';
import { combineForms} from 'react-redux-form';

import numbers from './testReducer.js';
import inputs from './inputReducer.js';

const reducer = combineReducers({
  numbers,
  inputs
});

export default reducer;