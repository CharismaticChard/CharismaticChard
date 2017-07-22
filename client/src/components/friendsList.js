import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import { connect } from 'react-redux';
import { setFriendsInfo, setDebtors } from '../actions/outputActions.js';

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const FriendsList = ({friendsInfo}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-6">Friend</div>
        <div className="col-xs-6">Number</div>
      </div>
      <hr />
      <div className="row">
        { 
          friendsInfo.map( (friendInfo, index) => ( 
            <div className="row" key={index}>
              <div className="col-xs-6">{friendInfo.friendName}</div>
              <div className="col-xs-6">{friendInfo.friendNumber}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);