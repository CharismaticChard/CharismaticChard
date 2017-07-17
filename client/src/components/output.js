import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';

import AddFriends from './addFriends.js';
import ItemList from './itemList.js';
import FriendsList from './friendsList.js';



// smart container 
// need to access redux 

class Output extends React.Component {

  constructor () {
    super();
    this.state = {
      friendInfo: {
        friendsName: [],
        friendsNumbers :[]
      }
    }
  }

  friendInfo(name, number) {
    // console.log('name', name);
    // console.log('number', number);
    var insertName = this.state.friendInfo.friendsName.concat(name);
    var insertNumber =this.state.friendInfo.friendsNumbers.concat(number);
    this.setState({
      friendInfo: {
        friendsName: insertName, 
        friendsNumbers: insertNumber
      }
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <ItemList />
            </Col>
            <Col xs={6} md={4}>
                {console.log('friendsName', this.state.friendInfo)}                       
              <FriendsList friendInfo={this.state.friendInfo} />
            </Col>
            <Col xsHidden md={4} >
              <AddFriends friendInfo={this.friendInfo.bind(this)}/>
            </Col>
          </Row>
        </Grid>
        <div>
          <input type="button" value="submit"/>  
        </div>
      </div>
    );
  }
}


export default Output;

