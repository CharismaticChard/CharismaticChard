import React from 'react';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setDebtor,
  setSplitterItems,
  setSplitterTotal,
  setSplitterTax,
  setSplitterTip,
  setSplitterDebtTotal,
} from '../actions/finalActions.js';
import { 
  addItem,
  setItem,
  setItems,
} from '../actions/inputActions.js';
import AddFriends from './addFriends.js';
import AddFriendsByUserButton from './addFriendsByUser.js';
import SharedGroup from './sortableGroup.js';

const mapStateToProps = state => {
  return {
    items: state.input.items,
    totalTax: state.final.totalTax,
    splitTotal: state.final.splitTotal,
    totalTip: state.final.totalTip,
    debtors: state.final.debtors,
    splitterName: state.final.splitter.name,
    splitterNumber: state.final.splitter.phone,
    splitterItems: state.final.splitter.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setItem: (input, index) => dispatch(
      setItem(input, index)
    ),
    addItem: (input) => dispatch(
      addItem(input)
    ),
    setSplitterItems: (input) => dispatch(
      setSplitterItems(input)
    ),
    setItems: (input) => dispatch(
      setItems(input)
    ),
    setDebtor: (input, index) => dispatch(
      setDebtor(input, index)
    ),
    setSplitterTotal: (input) => dispatch(
      setSplitterTotal(input)
    ),
    setSplitterDebtTotal: (input) => dispatch(
      setSplitterDebtTotal(input)
    ),
  };
};

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.splitItem = this.splitItem.bind(this);
    this.lists = {
      itemsList: this.props.items,
      splitterList: this.props.splitterItems,
      completedList: this.props.debtors
    };
  }

  splitTax(debtorTotal) {
    let percent = debtorTotal / (this.props.splitTotal - this.props.totalTax);
    let debtorTax = this.props.tax * percent;
    debtorTax = Number(debtorTax.toFixed(2));
    return debtorTax;
  }

  splitTip(debtorTotal) {
    let percent = debtorTotal / (this.props.splitTotal - this.props.totalTax);
    let debtorTip = this.props.tip * percent;
    debtorTip = Number(debtorTip.toFixed(2));
    return debtorTip;
  }

  calculateTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += Number(item.price);
    });
    return total;
  }

  splitItem(e) {
    e.preventDefault();
    var index = e.target.id;
    var first = this.props.items.slice()[index];

    first.price = (Number(first.price) / 2).toString();
    var second = {...first};
    second.item = '(2/2) ' + first.item;
    first.item = '(1/2) ' + first.item;

    this.props.setItem(first, index);
    this.props.addItem(second);
  }

  getItemInfoFromOrder(order) {
    return order.map(data => {
      var splitData = data.split(' ');
      var price = splitData.pop();
      return {
        item: splitData.join(' '),
        price: price
      };
    });
  }

  handleUnusedItemsChange(order) {
    this.props.setItems(this.getItemInfoFromOrder(order));
  }

  handleSplitterItemsChange(order) {
    this.props.setSplitterItems(this.getItemInfoFromOrder(order));
  }

  handleDebtorItemsChange(order, debtorIndex) {
    var debtor = Object.assign({}, this.props.debtors[debtorIndex]);
    debtor.items = this.getItemInfoFromOrder(order);
    this.props.setDebtor(debtor, debtorIndex);
  }

  calculateSplitterTotal() {
    var total = calculateTotal(this.props.splitterItems);
    this.props.setSplitterTotal(total);
    var tax = splitTax(total);
    var tip = splitTip(total);
    this.props.setSplitterTax(tax);
    this.props.setSplitterTip(tip);
    this.props.setSplitterDebtTotal(total + tax + tip);
  }

  calculateDebtorTotal(debtor, index) {
    var debtor = {...debtor};
    debtor.total = calculateTotal(debtor.items);
    debtor.tax = splitTax(debtor.total);
    debtor.tip = splitTip(debtor.total);
    debtor.debtTotal = debtor.total + debtor.tax + debtor.tip;
    this.props.setDebtor(debtor, index);
  }

  calculateDebtorsTotals() {
    this.props.debtors.forEach((debtor, index) => {
      calculateDebtorTotal(debtor, index);
    });
  }

  handleSubmit() {
    calculateSplitterTotal();
    calculateDebtorsTotals();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="list-group col-xs-6">
            <div className="row text-center">
              <div className="col-xs-12">
                <div className="row">
                  <h4>Items</h4>
                </div>
                <SharedGroup 
                  items={this.props.items}
                  onChange={this.handleUnusedItemsChange.bind(this)}
                  splitItem={this.splitItem}
                  className='itemsList'
                />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-4 containerTitle">tax</div>
                  <div className="col-xs-4 containerTitle">total</div>
                  <div className="col-xs-4 containerTitle">tip</div>
                  <hr />
                </div>
                <div className="row">
                  <div className="col-xs-4">{this.props.totalTax}</div>
                  <div className="col-xs-4">{this.props.splitTotal}</div>
                  <div className="col-xs-4">{this.props.totalTip}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-6 text-center">
            <div className="row">
              <h4>Friends List</h4>
            </div>
            <div className="row text-center friendsList">
              <div className="col-xs-12">
                <div className="row containerDivPadding">
                  <div className="col-xs-12">
                    <div className="row">
                      <h4>{this.props.splitterName}</h4>
                    </div>
                    <SharedGroup 
                      items={this.props.splitterItems}
                      onChange={this.handleSplitterItemsChange.bind(this)}
                      splitItem={this.splitItem}
                      className='list-group-item splitterList'
                    />
                  </div>
                </div>
              </div>
              {
                this.props.debtors.map((person, index) => (
                  <div className="row containerDivPadding" key={index}>
                    <div className="col-xs-12">
                      <div className="row">
                        <h4>{person.name}</h4>
                      </div>
                      <SharedGroup 
                        items={this.props.debtors[index].items}
                        onChange={this.handleDebtorItemsChange.bind(this)}
                        splitItem={this.splitItem}
                        className='list-group-item completedList'
                        debtorIndex={index}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
            <br/>
            <div className="row text-center">
              <div className="containerTitle">Add Friends By: </div>
              <div className="col-xs-6">
                <AddFriends />
              </div>
              <div className="col-xs-6">
                <AddFriendsByUserButton />
              </div>
            </div>
          </div>
        </div>
        <footer>
          <hr className="footerHR"/>
          <Link className="btn btn-primary" to="/input">Back</Link>
          <Link className="btn btn-primary" to="/confirmation" onClick={this.handleSubmit}>Done</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);