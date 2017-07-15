import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props); 
  }

  buttonClick() {
    console.log('checking!')

    var sampleDataFormatFromClient = {
      billTotal: 100,
      owner : {
          name: 'Minji', 
          phone: '+15108290026', 
          debtTotal: '$13',
          item : [ 
            { itemName : 'pizza',
              itemPrice : '$10',
              tax : '$1',
              tip : '$2'
            } 
          ]
      }, 
      debtors: [
          {
            name: 'Kai', 
            phone: '+16508155855', 
            debtTotal: '$16',
            item : [ 
              { itemName : 'salad',
                itemPrice : '$11'
              }, 
            ],
            tax : '$2',
            tip : '$3'
          },
          
          {
            name: 'Carlos', 
            phone: '+14433109844', 
            debtTotal: '$20',
            item : [ 
              { itemName : 'tacos',
                itemPrice : '$15'
              } 
            ],
            tax: '$2',
            tip: '$3'
          },
    
          {
            name: 'Joe', 
            phone: '+17146844358', 
            debtTotal: '$23',
            item : [ 
              { itemName : 'burger',
                itemPrice : '$18'
              }
            ],
            tax : '$2',
            tip : '$3'
          }
      ],
      billName: 'thesis Group'
    }

    axios.post('/twilio', sampleDataFormatFromClient)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
    });
  }


  render() {
    return (
      <div>
        <input onClick={this.buttonClick.bind(this)} type="button" value="submit!"/>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
