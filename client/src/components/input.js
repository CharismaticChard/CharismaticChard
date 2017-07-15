import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import { connect } from 'react-redux';
import $ from 'jquery';

const mapStateToProps = state => {
  return {
    numbers: state.numbers.numbers
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
//grab user input and display to screen on submit
//dynamically allow for addition of form fields
const Input = ({numbers}) => {
  let formObj = {};

  const send = () => {
    //invoke dispatch on formObj
    //formObj = {};
  };

  const formSubmit = event => {
    e.preventDefault();
    var data = {};
    var items = document.getElementsByClassName('itemsForm');
    var formData = new FormData(items);
    var iterator = formData.entries();
    for (var pair of iterator) {
      data[pair[0]] = pair[1];
    }
    console.log('here');
  };

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
          <FormGroup className="itemsForm">
            <div className="formContainer">
              <div className="formItem">
                <FormControl className="formItemBit" type="text" placeholder="Item Name..." />
                <FormControl className="formItemBit" type="number" placeholder="Price..." />
              </div>
              <div className="formItem">
                <FormControl className="formItemBit" type="text" placeholder="Item Name..." />
                <FormControl className="formItemBit" type="number" placeholder="Price..." />
              </div>
              <div className="formItem">
                <FormControl className="formItemBit" type="text" placeholder="Item Name..." />
                <FormControl className="formItemBit" type="number" placeholder="Price..." />
              </div>
            </div>
            <hr/>
          </FormGroup>
          <br></br>
          <FormGroup className="tipTaxTotalForm">
            <div className="formContainer">
              <div className="formItem">
                <FormControl type="number" placeholder="Tax..." />
              </div>
              <div className="formItem">
                <FormControl type="number" placeholder="Total..." />
              </div>
              <div className="formItem">
                <FormControl type="number" placeholder="Tip..." />
              </div>
            </div>
            <hr/>
          </FormGroup>
          <Button type="submit" onClick={formSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Input);