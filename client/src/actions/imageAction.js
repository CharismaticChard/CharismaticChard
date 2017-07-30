import axios from 'axios';

const sendItemImageToServer = (items) => {
  return () => { 
    axios.post('/api/items-image', items)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const imageItem = (itemPos) => {
  return {
    type: 'IMAGE-ITEM',
    payload: itemPos,
  };
};


export {
  imageItem,
  sendItemImageToServer
};