import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { inputLoading } from '../actions/historyAction.js';
import ItemInputList from './itemInputList.js';
import ItemEditList from './itemEditList.js';

const mapStateToProps = state => {
  return {
    items: state.input.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  addItem() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  removeItem() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    var itemList = (this.props.items.length === 0) ? <ItemInputList counter={this.state.counter}/> : <ItemEditList />;
    return (
      <div className="container">
        {itemList}
        <div className="inputContainer row formItem">
          <div className="inputItem col-xs-6">
            <Button className="btn btn-sm btn-primary" onClick={this.addItem.bind(this)}>Add Item</Button>
          </div>
          <div className="inputItem col-xs-6">
            <Button className="btn btn-sm btn-primary" onClick={this.removeItem.bind(this)}>Remove Item</Button>
          </div>
        </div>
        <br />
        <footer>
          <hr className="footerHR"/>
          <Link className="btn btn-primary" to="/">Cancel</Link>
          <Link className="btn btn-primary" to="/dragAndDrop">Submit</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);