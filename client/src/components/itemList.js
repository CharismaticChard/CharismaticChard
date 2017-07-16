import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import ItemEntry from './itemEntry.js';


var dummyInputBillData= {
  items: [{item: "pizza", price: "$10"}, {item: "salad", price: "$8"}, {item: "sushi", price: "$16"}, {item: "burger", price: "$13"},{item: "cupcake", price: "$5"}],
  total: "$30",
  tip: "$5", 
  tax: "$4"
};



const ItemList = () => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Items</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        { dummyInputBillData.items !== null ? dummyInputBillData.items.map( (item, index) => { return <ItemEntry key={index} item={item} />; }) : null }   
        <tr>
          <td>tip</td>
          <td>{dummyInputBillData.tip}</td>
        </tr>
        <tr>
          <td>tax</td>
          <td>{dummyInputBillData.tax}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>total</th>
          <th>{dummyInputBillData.total}</th>
        </tr>
      </tfoot>
    </Table>
  );
}


export default ItemList;

