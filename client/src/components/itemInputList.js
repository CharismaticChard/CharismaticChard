import React from 'react';
import { connect } from 'react-redux';
import { setItems, setTax, setTotal, setTip } from '../actions/inputActions.js';
import { setSplitName } from '../actions/finalActions.js';

const mapStateToProps = state => {
  return {
    items: state.input.items,
    tax: state.input.tax,
    total: state.input.total,
    tip: state.input.tip,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setItems: (input) => dispatch(
      setItems(input)
    ),
    setTax: (input) => dispatch(
      setTax(input)
    ),
    setTotal: (input) => dispatch(
      setTotal(input)
    ),
    setTip: (input) => dispatch(
      setTip(input)
    ),
    setSplitName: (input) => dispatch(
      setSplitName(input)
    ),
  };
};

class ItemInputList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeDyna = this.handleChangeDyna.bind(this);
    this.handleChangeTax = this.handleChangeTax.bind(this);
    this.handleChangeTotal = this.handleChangeTotal.bind(this);
    this.handleChangeTip = this.handleChangeTip.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(e) {
    e.preventDefault();
    this.props.setSplitName(e.target.value);
  }

  handleChangeDyna(e) {
    e.preventDefault();
    var val = e.target.value;
    var id = e.target.id;
    var copy = this.state.items.slice();
    if (e.target.type === 'number') {
      copy[id].price = Number(val);
    } else if (e.target.type === 'text') {
      copy[id].item = val;
    }
    this.props.setItems(copy);
  }

  handleChangeTax(e) {
    e.preventDefault();
    this.props.setTax(e.target.value);
  }

  handleChangeTotal(e) {
    e.preventDefault();
    this.props.setTotal(e.target.value);
  }

  handleChangeTip(e) {
    e.preventDefault();
    this.props.setTip(e.target.value);
  }

  render() {
    return (
      <div>
        <div className="inputContainer row formItem">
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Split Name</label>
            <input type="text" className="inputItemBit name form-control" onChange={this.handleChangeName} placeholder="Name..." required/>
          </div>
        </div>
        <div className="items">
          {
            [...Array(this.props.counter)].map((item, index) => (
              <div key={index} className="inputContainer row formItem">
                <div className="inputItem col-xs-6">
                  <label className="inputItemBit">Item</label>
                  <input type="text" className="inputItemBit form-control" id={index} placeholder="Item..." onChange={this.handleChangeDyna} required/>
                </div>
                <div className="inputItem col-xs-6">
                  <label className="inputItemBit">Price</label>
                  <input type="number" className="inputItemBit form-control" id={index} placeholder="Price..." onChange={this.handleChangeDyna} required/>
                </div>
              </div>
            ))
          }
        </div>
        <div className="inputContainer row formItem">
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Tax</label>
            <input type="number" className="inputItemBit tax form-control" placeholder="Tax..." onChange={this.handleChangeTax} required/>
          </div>
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Total</label>
            <input type="number" className="inputItemBit total form-control" placeholder="Total..." onChange={this.handleChangeTotal} required/>
          </div>
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Tip</label>
            <input type="number" className="inputItemBit tip form-control" placeholder="Tip..." onChange={this.handleChangeTip} required/>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInputList);