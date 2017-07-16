import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';

import AddFriends from './addFriends.js';
import ItemList from './itemList.js';



// smart container 
// need to access redux 

class Output extends React.Component {

  render() {
    return (
      <Grid>
        <Row className="show-grid">
 
        <Col xs={6} md={4}>
          <ItemList />
        </Col>

        <Col xs={6} md={4}>
          
        </Col>

        <Col xsHidden md={4} >
          <AddFriends />
        </Col>


        </Row>
      </Grid>
    );
  }
}


export default Output;

