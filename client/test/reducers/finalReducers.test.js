import React from 'react';
import { shallow, mount, render } from 'enzyme';
import reducer from '../../src/reducers/finalReducer.js';

describe('actions', () => {
  const intialState = {
    splitTotal: 0,
    totalTax: 0,
    totalTip: 0,
    splitName: null,
    splitter: {
      name: '',
      phone: '',
      items: null,
      debtTotal: null,
      tax: null,
      tip: null
    },
    debtors: []
  };

  it('should return the ititial state', () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });

  it('should update the split total property', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_SPLIT_TOTAL', payload: 15}
      )).toEqual(
        {
          splitTotal: 15,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the split tax', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_TOTAL_TAX', payload: 15}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 15,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the split tip', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_TOTAL_TIP', payload: 15}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 15,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the split name', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_SPLIT_NAME', payload: 'test'}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: 'test',
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the splitter name', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_SPLITTER_NAME', payload: 'test'}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: 'test',
            phone: '',
            items: null,
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the splitter phone', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_SPLITTER_PHONE', payload: '1234567890'}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '1234567890',
            items: null,
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the splitter items', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_SPLITTER_ITEMS', payload: [{test: 'item'}]}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: [{test: 'item'}],
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the splitter total', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_SPLITTER_DEBTTOTAL', payload: 15}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: 15,
            tax: null,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the splitter tax', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_DEBTORS_TAX', payload: 15}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: null,
            tax: 15,
            tip: null
          },
          debtors: []
        }
      );
  });

  it('should update the splitter tip', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_DEBTORS_TIP', payload: 15}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: null,
            tax: null,
            tip: 15
          },
          debtors: []
        }
      );
  });

  it('should update the splitter tip', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_DEBTORS', payload: [{debtor: 'test'}]}
      )).toEqual(
        {
          splitTotal: 0,
          totalTax: 0,
          totalTip: 0,
          splitName: null,
          splitter: {
            name: '',
            phone: '',
            items: null,
            debtTotal: null,
            tax: null,
            tip: null
          },
          debtors: [{debtor: 'test'}]
        }
      );
  });

});