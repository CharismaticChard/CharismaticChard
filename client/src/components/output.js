import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';

import AddFriends from './addFriends.js';
import ItemList from './itemList.js';
import FriendsList from './friendsList.js';
import axios from 'axios';
import { setFriendsInfo, setDebtors } from '../actions/outputActions.js';

const mapStateToProps = state => {
  return {
    debtors: state.output.debtors,
    friendsInfo: state.output.friendsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDebtors: (input) => dispatch(
      setDebtors(input)
    ),
    setFriendsInfo: (input) => dispatch(
      setFriendsInfo(input)
    ),
  };
};

let names = []; 
let foodList = []; 

class Output extends React.Component {
  constructor () {
    super();
    this.state = {
      debtors: []
    };
  }

  friendInfo(name, number) {
    let friendInformation = {
      friendName: name,
      friendNumber: number
    };
    let info= this.state.friendsInfo.concat(friendInformation);
    this.setState({
      friendsInfo: info
    });
  }

  collectSplitItemInfo(name, item, price) {
    let numbers = this.props.friendsInfo;
    let number = null;
    numbers.forEach( (person) => {
      if( name === person.friendName) {
        number = person.friendNumber;
      }
    });
    let itemAndPrice = {
      itemName: item,
      itemPrice: price,
      quantity: 1
    };

    let debtor = {
      name: name,
      number: number,
      items:[ ]
    };

    let debtors = this.state.debtors;
    if ( debtors.length === 0) {
      this.addFirstDebtor(debtor, itemAndPrice);
    } else if( debtors.length > 0){ 
      if ( names.indexOf(name) === -1 ) {
        this.addDebtor(debtor, itemAndPrice);
      } else {
        this.findDebtor(debtors, name, itemAndPrice);
      }
    }
  }

  addFirstDebtor(debtor, itemAndPrice) {
    debtor.items.push(itemAndPrice);
    foodList.push(itemAndPrice.itemName); 
    var debtorInfo = this.state.debtors.concat(debtor);
    this.setState({
      debtors: debtorInfo
    }, this.helperSetState);
  }


  addDebtor(debtor, itemAndPrice) {
    debtor.items.push(itemAndPrice);
    foodList.push(itemAndPrice.itemName); 
    var debtorInfo = this.state.debtors.concat(debtor);
    this.setState({
      debtors: debtorInfo
    }, this.helperSetState);
  }


  findDebtor(debtors, name, itemAndPrice) {
    for ( let i = 0; i < debtors.length; i++) {
      if ( debtors[i].name === name ) {
        foodList.push(itemAndPrice.itemName); 
        debtors[i].items.push(itemAndPrice);
      } 
      if ( foodList.indexOf(itemAndPrice.itemName) !== -1 && debtors[i].name !== name ) {
        var items = debtors[i].items; 
        for ( var j = 0; j < items.length; j++ ) {
          if( items[j].itemName === itemAndPrice.itemName ) {
            items.splice(j, 1);
          } 
        }
      }
    }
  }

  helperSetState () {
    var debtors = this.state.debtors;
    for (let i = 0; i < debtors.length; i++) {
      if(names.indexOf(debtors[i].name) === -1){
        names.push(debtors[i].name); 
      }
    }
  }

  submitDebtors() {
    // console.log('debtors checkiiiing', this.state.debtors); 
    var debtors = this.state.debtors; 
    // iterate the debtors 
    // at each debtor object iterate the items 
    // create new debtTotal array 
    // push all item price and sum all price in debtTotal array 
    
    var debtTotal =[]; 
    for ( var i = 0; i < debtors.length; i++) {
      var itemPrice = []; 
      for ( var j = 0; j < debtors[i].items.length; j++) {
        itemPrice.push( Number(debtors[i].items[j].itemPrice) ); 
      }
      debtTotal.push(itemPrice);
    }

    for ( var x = 0; x < debtTotal.length; x ++) {
      debtTotal[x] = debtTotal[x].reduce((a,b) => a+b); 
    }

    for ( var z = 0; z < debtors.length; z++) {
      debtors[z]['debtTotal'] = debtTotal[z]; 
    }
    console.log('debtTotal::',debtors);

    this.props.setDebtors(this.state.debtors);
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={10} md={5}>
              <ItemList collectSplitItemInfo={this.collectSplitItemInfo.bind(this)}/>
            </Col>
            <Col xs={6} md={4}>
              <AddFriends />
              <FriendsList  />
            </Col>
            <Col xsHidden md={4} >
            </Col>
          </Row>
        </Grid>
        <div>
          <Button onClick={this.submitDebtors.bind(this)} bsStyle="primary" bsSize="small">Calculate</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Output);