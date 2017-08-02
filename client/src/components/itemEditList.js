import React from 'react';
import { connect } from 'react-redux';

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
  };
};

class ItemEditList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      tax: 0,
      total: 0,
      tip: 0,
    }
    this.handleChangeDyna = this.handleChangeDyna.bind(this);
    this.handleChangeTax = this.handleChangeTax.bind(this);
    this.handleChangeTotal = this.handleChangeTotal.bind(this);
    this.handleChangeTip = this.handleChangeTip.bind(this);
  }

  componentDidMount() {
    this.setState({
      items: this.props.items,
      tax: this.props.tax,
      total: this.props.total,
      tip: this.props.tip,
    });
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
    this.setState({
      items: copy
    });
  }

  handleChangeTax(e) {
    e.preventDefault();
    this.setState({
      tax: Number(e.target.value)
    });
  }

  handleChangeTotal(e) {
    e.preventDefault();
    this.setState({
      total: Number(e.target.value)
    });
  }

  handleChangeTip(e) {
    e.preventDefault();
    this.setState({
      tip: Number(e.target.value)
    });
  }

  render() {
    return (
      <div>
        <div className="inputContainer row formItem">
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Split Name</label>
            <input type="text" className="inputItemBit name form-control" placeholder="Name..." required/>
          </div>
        </div>
        <div className="items">
          {
            this.state.items.map((item, index) => (
              <div key={index} className="inputContainer row formItem">
                <div className="inputItem col-xs-6">
                  <label className="inputItemBit">Item</label>
                  <input type="text" className="inputItemBit form-control" id={index} placeholder="Item..." value={item.item} onChange={this.handleChangeDyna} required/>
                </div>
                <div className="inputItem col-xs-6">
                  <label className="inputItemBit">Price</label>
                  <input type="number" className="inputItemBit form-control" id={index} placeholder="Price..." value={Number(item.price)} onChange={this.handleChangeDyna} required/>
                </div>
              </div>
            ))
          }
        </div>
        <div className="inputContainer row formItem">
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Tax</label>
            <input type="number" className="inputItemBit tax form-control" placeholder="Tax..." value={Number(this.state.tax)} onChange={this.handleChange} required/>
          </div>
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Total</label>
            <input type="number" className="inputItemBit total form-control" placeholder="Total..." value={Number(this.state.total)} onChange={this.handleChange} required/>
          </div>
          <div className="inputItem col-xs-12">
            <label className="inputItemBit">Tip</label>
            <input type="number" className="inputItemBit tip form-control" placeholder="Tip..." value={Number(this.state.tip)} onChange={this.handleChange} required/>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditList);