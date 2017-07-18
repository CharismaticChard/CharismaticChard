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



var dummyInputBillData= {
  items: [{item: "pizza", price: "$10"}, {item: "salad", price: "$8"}, {item: "sushi", price: "$16"}, {item: "burger", price: "$13"},{item: "cupcake", price: "$5"}],
  total: "$30",
  tip: "$5", 
  tax: "$4"
};



// smart container 
// need to access redux 
class Output extends React.Component {

  constructor () {
    super();
    this.state = {
      friendsInfo: [],
      debtors: []
    };
  }

  friendInfo(name, number) {
    var friendInformation = {
      friendName: name,
      friendNumber: number 
    };
    var info= this.state.friendsInfo.concat(friendInformation);
    this.setState({
      friendsInfo: info
    });
  }

  collectSplitItemInfo(name, item, price) {

    let numbers = this.state.friendsInfo;
    let number = null; 
    numbers.forEach( (person) => {
      if( name === person.friendName) {
        number = person.friendNumber
      }
    });
    // name, number ,price , item 
    let debtor = {
      name: name,
      number: number,
      debtTotal: item,
      item: price
    };
    var debtorInfo = this.state.debtors.concat(debtor);
    this.setState({
      debtors: debtorInfo
    });
  }


  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={10} md={5}>
              <ItemList dummyInputBillData={dummyInputBillData} friendsInfo={this.state.friendsInfo} collectSplitItemInfo={this.collectSplitItemInfo.bind(this)}/>
            </Col>
            <Col xs={6} md={4}>
              <AddFriends friendInfo={this.friendInfo.bind(this)}/>
              <FriendsList friendsInfo={this.state.friendsInfo} />
            </Col>
            <Col xsHidden md={4} >
            {    console.log('storage:::', this.state.debtors)}
            </Col>
          </Row>
        </Grid>
        <div>
          <Button bsStyle="primary" bsSize="small">Send</Button>
        </div>
      </div>
    );
  }
}


export default Output;