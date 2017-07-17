import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

import { setInputs } from '../actions/inputActions.js';

const mapStateToProps = state => {
  return {
    numbers: state.numbers.numbers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInputs: () => dispatch(
      setInputs()
    )
  };
};
//grab user input and display to screen on submit
//dynamically allow for addition of form fields
const Input = ({numbers}) => {
  return (
    <div>
      <h1>Hello Input</h1>
      <p>{numbers}</p>
      <div className="inputContainer">
        <div className="inputHeader">
          <h1>Input Receipt Items</h1>
          <hr/>
        </div>
        <div className="inputBody">
          <div className="itemsForm">
            <div className="formContainer">
              <div className="formItem">
                <input className="formItemBit" type="text" placeholder="Item Name..." />
                <input className="formItemBit" type="number" placeholder="Price..." />
              </div>
              <div className="formItem">
                <input className="formItemBit" type="text" placeholder="Item Name..." />
                <input className="formItemBit" type="number" placeholder="Price..." />
              </div>
              <div className="formItem">
                <input className="formItemBit" type="text" placeholder="Item Name..." />
                <input className="formItemBit" type="number" placeholder="Price..." />
              </div>
            </div>
            <button type="button" className="btn btn-default" aria-label="Left Align">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <p>Add Items</p>
            </button>
            <hr/>
          </div>
          <br></br>
          <div className="tipTaxTotalForm">
            <div className="formContainer">
              <div className="formItem">
                <input className="formItemBit" type="number" placeholder="Tax..." />
              </div>
              <div className="formItem">
                <input className="formItemBit" type="number" placeholder="Total..." />
              </div>
              <div className="formItem">
                <input className="formItemBit" type="number" placeholder="Tip..." />
              </div>
            </div>
            <hr/>
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Input);