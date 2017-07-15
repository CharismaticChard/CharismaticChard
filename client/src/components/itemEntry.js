import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';
import { connect } from 'react-redux';

// dumb component 
const ItemEntry = ({item}) => {
  return (

      <tr>
        <td> {item.item}</td>
        <td> {item.price}</td>
      </tr>

  )
}

export default ItemEntry;



  // <tr>
  //       <td>{item}</td>
  //       <td>{price}</td>
  //     </tr>

   // <tr>
 //            <td>Table cell</td>
 //            <td>Table cell</td>
 //          </tr>