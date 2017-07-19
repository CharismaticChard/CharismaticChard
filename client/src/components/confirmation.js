import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    // debtors: state.output.debtors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const sampleDataDebtors = {
  debtors: [
    {
      name: 'Kai', 
      phone: '+16508155855', 
      debtTotal: 16.54,
      items : [ 
        { itemName : 'salad',
          itemPrice : 11.32,
          quantity: 1
        }, 
      ],
      tax : 2.22,
      tip : 3.00
    },
    
    {
      name: 'Carlos', 
      phone: '+14433109844', 
      debtTotal: 20.00,
      items : [ 
        { itemName : 'tacos',
          itemPrice : 15.00,
          quantity: 1
        } 
      ],
      tax: 2.00,
      tip: 3.00
    },

    {
      name: 'Joe', 
      phone: '+17146844358', 
      debtTotal: 23.43,
      items : [ 
        { itemName : 'burger',
          itemPrice : 18.01,
          quantity: 1
        }
      ],
      tax : 2.21,
      tip : 3.21
    }
  ]
};

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <div>
          {
            sampleDataDebtors.debtors.map( (debtor, index) => (
              <div>
                <p>{debtor.name}</p>
                <p>{debtor.phone}</p>
                {
                  debtor.items.map( (item, index) => (
                    <div>
                      <p>{item.itemName}</p>
                      <p>{item.itemPrice}</p>
                      <p>{item.quantity}</p>
                    </div>
                  ))
                }
                <p>{debtor.tax}</p>
                <p>{debtor.tip}</p>
                <p>{debtor.debtTotal}</p>
                <hr/>
              </div>
            ))
          }
        </div>
        <div>
          <Button bsStyle="primary" bsSize="small">Confirm & Send</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
