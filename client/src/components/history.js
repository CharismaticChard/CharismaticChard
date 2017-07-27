import React from 'react';
import Button from 'react-bootstrap/lib/Button';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import { Link } from 'react-router-dom';
// import { setFriendsInfo } from '../actions/outputActions.js';
import { fetchSplitterHistory } from '../actions/historyAction.js';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    // debtors: state.output.debtors,
    // final: state.final,
    // splitter: state.final.splitter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSplitterHistory: (input) => dispatch(
      fetchSplitterHistory(input)
    ),
  };
};


class History extends React.Component {
  componentWillMount() {
    this.props.fetchSplitterHistory();
    console.log('fetchSplitterHistory');
  }

  render() {
    return (
      <div>
        <h1>checking!</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
