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
import { Link } from 'react-router-dom';
import { setFriendsInfo } from '../actions/outputActions.js';
import { sendStateToServer } from '../actions/finalActions.js';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    debtors: state.final.debtors,
    final: state.final,
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

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
    this.props.sendStateToServer(this.props.final);
  }

  render() {
    return (
      <div>
        <div>
          <h3 className="homeWelcome">Review Items</h3>
          <div className="container-fluid">
            <div className="row">
              <label className="col-xs-6">Name: </label>
              <p className="col-xs-6">{this.props.splitter.name}</p>
            </div>
            <div className="row">
              <label className="col-xs-6">Phone: </label>
              <p className="col-xs-6">{this.props.splitter.phone}</p>
            </div>
            <p className="boldP">Items</p>
            {
              this.props.splitter.items.map((item, index) => (
                <div key={index}>
                  <div className="row">
                    <label className="col-xs-6">Name: </label>
                    <p className="col-xs-6">{item.name}</p>
                  </div>
                  <div className="row">
                    <label className="col-xs-6">Price: </label>
                    <p className="col-xs-6">{item.price}</p>
                  </div>
                </div>
              ))
            }
            <div className="row">
              <label className="col-xs-6">Items Total: </label>
              <p className="col-xs-6">{this.props.splitter.total}</p>
            </div>
            <div className="row">
              <label className="col-xs-6">Tax: </label>
              <p className="col-xs-6">{this.props.splitter.tax}</p>
            </div>
            <div className="row">
              <label className="col-xs-6">Tip: </label>
              <p className="col-xs-6">{this.props.splitter.tip}</p>
            </div>
            <div className="row">
              <label className="col-xs-6">Final Total: </label>
              <p className="col-xs-6">{this.props.splitter.debtTotal}</p>
            </div>
            <hr/>
          </div>
          <div className="container-fluid">
            <hr />
            {
              this.props.debtors !== null ? this.props.debtors.map((debtor, index) => (
                <div key={index}>
                  <div className="row">
                    <label className="col-xs-6">Name: </label>
                    <p className="col-xs-6">{debtor.name}</p>
                  </div>
                  <div className="row">
                    <label className="col-xs-6">Phone: </label>
                    <p className="col-xs-6">{debtor.phone}</p>
                  </div>
                  <p className="boldP">Items</p>
                  {
                    debtor.items.map((item, index) => (
                      <div key={index}>
                        <div className="row">
                          <label className="col-xs-6">Name: </label>
                          <p className="col-xs-6">{item.name}</p>
                        </div>
                        <div className="row">
                          <label className="col-xs-6">Price: </label>
                          <p className="col-xs-6">{item.price}</p>
                        </div>
                      </div>
                    ))
                  }
                  <div className="row">
                    <label className="col-xs-6">Items Total: </label>
                    <p className="col-xs-6">{debtor.total}</p>
                  </div>
                  <div className="row">
                    <label className="col-xs-6">Tax: </label>
                    <p className="col-xs-6">{debtor.tax}</p>
                  </div>
                  <div className="row">
                    <label className="col-xs-6">Tip: </label>
                    <p className="col-xs-6">{debtor.tip}</p>
                  </div>
                  <div className="row">
                    <label className="col-xs-6">Final Total: </label>
                    <p className="col-xs-6">{debtor.debtTotal}</p>
                  </div>
                <hr />
                </div>
              ))
                : null
            }
          </div>
          <hr />
          <div className="container-fluid">
            <div className="row">
              <label className="col-xs-6 boldP">Split Name: </label>
              <p className="col-xs-6">{this.props.final.splitName}</p>
            </div>
            <div className="row">
              <label className="col-xs-6 boldP">Tax: </label>
              <p className="col-xs-6">{this.props.final.totalTax}</p>
            </div>
            <div className="row">
              <label className="col-xs-6 boldP">Tip: </label>
              <p className="col-xs-6">{this.props.final.totalTip}</p>
            </div>
            <div className="row">
              <label className="col-xs-6 boldP">Final Total: </label>
              <p className="col-xs-6">{this.props.final.splitTotal}</p>
            </div>
          </div>
          <div>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title>Text messages have been sent!</Modal.Title>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-primary" to="/" onClick={this.close.bind(this)}>Close</Link>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <footer>
              <hr className="footerHR"/>
              <Button onClick={this.open.bind(this)} bsStyle="primary" bsSize="small">Confirm & Send</Button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
