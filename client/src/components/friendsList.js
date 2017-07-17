import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';


var dummyInputBillData= {
  items: [{item: "pizza", price: "$10"}, {item: "salad", price: "$8"}, {item: "sushi", price: "$16"}, {item: "burger", price: "$13"},{item: "cupcake", price: "$5"}],
  total: "$30",
  tip: "$5", 
  tax: "$4"
};



const FriendsList = () => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Friends</th>
          <th>Numbers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>tip</td>
        </tr>
        <tr>
          <td>tax</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>total</th>
        </tr>
      </tfoot>
    </Table>
  );
};


export default FriendsList;

