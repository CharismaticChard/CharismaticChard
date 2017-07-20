import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import axios from 'axios';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo,
    debtors: state.output.debtors,
    tax: state.input.tax,
    total: state.input.total,
    tip: state.input.tip,
    splitter: state.final.splitter, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendStateToServer: (input) => dispatch(
      sendStateToServer(input)
    ),
  };
};

class Confirmation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false 
    };
  }

  calculateTax() {
    //iterate over debtors array reducing debtor totals to get total item sum
    //subtract sum of items from total
    //return that number
  }

  splitTax(debtorTotal) {
    let percent = debtorTotal / this.props.total;
    let debtorTax = this.props.tax * percent;
    debtorTax= String(debtorTax).split("").slice(0,5).join("");
    return Number(debtorTax);
  }

  splitTip(debtorTotal) {
    let percent = debtorTotal / this.props.total;
    let debtorTip = this.props.tip * percent;
    debtorTip = String(debtorTip).split("").slice(0,5).join("");
    return Number(debtorTip);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
    // this.callAxios(); 
    this.debtors(); 
  }

  debtors () {
    let debtors = this.props.debtors; 
    debtors.forEach((debtor) => {
      debtor.tax = this.splitTax(debtor.debtTotal); 
      debtor.tip = this.splitTip(debtor.debtTotal);
    }); 
    this.dataStructure(debtors);
  }



  splitterInfo (name) {
    console.log('checking!');
    let splitter = {
      name: name, 
      phone: this.props.splitter.phone,
      debtTotal: null,
      items : [ 
        { itemName : 'pizza',
          itemPrice : 10.23,
          quantity: 1
        } 
      ],
      tax : 1.00,
      tip : 2.12
    };
    console.log('splitter',splitter); 
  }



  dataStructure (debtors) {
    let finalDataStrcture = {
      splitTotal: this.props.total,
      totalTax: this.props.tax,
      totalTip: this.props.tip, 
      splitName: null, 
      splitter : {
        name: 'Minji', 
        phone: '+15108290026',
        debtTotal: 13.35,
        items : [ 
          { itemName : 'pizza',
            itemPrice : 10.23,
            quantity: 1
          } 
        ],
        tax : 1.00,
        tip : 2.12
      },
      debtors : debtors
    };
    console.log('finalDataStrcture', finalDataStrcture);
    // this.props.sendStateToServer(finalDataStrcture);
  }
  


  render() {
    return (
      <div>
        <h1>Review Items</h1>
        <div className="container-fluid">
          {
            this.props.debtors !== null ? this.props.debtors.map( (debtor, index) => (
              <div key={index}>
                <div  className="row">
                  <label className="col-xs-6">Name: </label>
                  <p className="col-xs-6">{debtor.name}</p>
                </div>
                <div  className="row">
                  <label className="col-xs-6">Phone: </label>
                  <p className="col-xs-6">{debtor.number}</p>
                </div>
                <label>Items: </label>
                {
                  debtor.items.map( (item, index) => (
                    <div key={index}>
                      <div className="row">
                        <label className="col-xs-6">Name: </label>
                        <p className="col-xs-6">{item.itemName}</p>
                      </div>
                      <div className="row">
                        <label className="col-xs-6">Price: </label>
                        <p className="col-xs-6">{item.itemPrice}</p>
                      </div>
                      <div className="row">
                        <label className="col-xs-6">Quantity: </label>
                        <p className="col-xs-6">{item.quantity}</p>
                      </div>
                    </div>
                  ))
                }
                <div  className="row">
                  <label className="col-xs-6">Tax: </label>
                  <p className="col-xs-6">{this.splitTax(debtor.debtTotal)}</p>
                </div>
                <div  className="row">
                  <label className="col-xs-6">Tip: </label>
                  <p className="col-xs-6">{this.splitTip(debtor.debtTotal)}</p>
                </div>
                <div  className="row">
                  <label className="col-xs-6">Total: </label>
                  <p className="col-xs-6">{debtor.debtTotal}</p>
                </div>
                <hr/>
              </div>
            ))
              : null
          }
        </div>
        <div>
          <Button onClick={this.open.bind(this)} bsStyle="primary" bsSize="small">Confirm & Send</Button>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Modal.Title>Text messages have been sent!</Modal.Title>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
