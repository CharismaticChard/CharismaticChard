import React from 'react';

// dumb component 
const ItemEntry = ({item}) => {
  return (
    <tr>
      <td>{item.item}</td>
      <td>{item.price}</td>
    </tr>
  );
};

export default ItemEntry;
