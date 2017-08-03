import React from 'react';
import Sortable from 'react-sortablejs';

const SharedGroup = ({items, onChange, splitItem, className, debtorIndex}) => (
  <Sortable 
    className = {"row sortableList " + className}
    options={{
      group: 'shared',
      pull: true,
      put: true
    }}
    onChange={(order, sortable, event) => {
      // console.log(order);
      // console.log(sortable);
      console.log(event);
      console.log('old:', event.oldIndex);
      console.log('new:', event.newIndex);
      console.log('from: ', event.from.className);
      console.log('to: ', event.to.className);
      onChange(order, debtorIndex);
    }}

  >
    {
      items.map((item, index) => (
        <div className="list-group-item" data-id={item.item + ' ' + item.price} key={index}>
          {item.item} ${item.price}
          <button className="splitBtn btn" id={index} onClick={splitItem}>
            Split
          </button>
        </div>
      ))
    }
  </Sortable>
);

export default SharedGroup;