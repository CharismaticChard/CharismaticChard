import React from 'react';
import { connect } from 'react-redux';
import Sortable from 'sortablejs';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import AddFriends from './addFriends.js';

//TODO
//if items still in the items list disable confirm button


const mapStateToProps = state => {
  return {
    items: state.input.items,
    friendsInfo: state.output.friendsInfo,
    tax: state.input.tax,
    total: state.input.total,
    tip: state.input.tip,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      peopleAndItems: [],
    };
    this.show = this.show.bind(this);
    this.makeSortable = this.makeSortable.bind(this);
  }

  show() {
    var $sortableLists = $('.completedList');
    var users = [];
    $sortableLists.each((index, list) => {
      var user = {};
      var nameAndPhone = list.id.split(' ');
      user.name = nameAndPhone[0];
      user.phone = nameAndPhone[1];
      user.items = [];
      if (list.children.length > 0) {
        $.each(list.children, (name, obj) => {
          var item = {};
          var itemAndPrice = obj.textContent.split('  $');
          item.name = itemAndPrice[0];
          item.price = itemAndPrice[1];
          user.items.push(item);
        });
      }
      users.push(user);
    });
    console.log(users);
    this.setState({
      peopleAndItems: users,
    });
  }

  makeSortable() {
    var $sortableLists = $('.sortableList');
    $sortableLists.each((index, list) => {
      Sortable.create(list, {group: 'test'});
    });
  }

  componentDidMount() {
    this.makeSortable();
  }

  componentDidUpdate() {
    this.makeSortable();
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="logo text-center">
              <img src="./assets/splitter-logo.png" className="mx-auto d-block" width="200"/>
            </div>
          </div>
        </div>
        <hr />
        <div className="container-fluid">
          <div className="row">
            <div className="list-group col-xs-6">
              <div className="row">
                <div className="list-group-item boldItemsHeaders containerTitle">
                  <p className="boldItemsHeaders">Items</p>
                </div>
                <div className="sortableList">
                  {
                    this.props.items.map((item) => (
                      <div className="list-group-item" key={item.id}>
                        {item.item}  ${item.price}
                      </div>
                    ))
                  }
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-4 containerTitle boldItemsHeaders">tax</div>
                    <div className="col-xs-4 containerTitle boldItemsHeaders">total</div>
                    <div className="col-xs-4 containerTitle boldItemsHeaders">tip</div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4">{this.props.tax}</div>
                    <div className="col-xs-4">{this.props.total}</div>
                    <div className="col-xs-4">{this.props.tip}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6">
              <h4>Friends List</h4>
              {
                this.props.friendsInfo.map((person, index) => (
                  <div className="containerDivPadding" key={index}>
                    <div className="containerTitle list-group-item boldItemsHeaders">
                      {person.friendName}
                    </div>
                    <div className="list-group-item sortableList completedList" id={person.friendName + ' ' + person.friendNumber}>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="row">
            <AddFriends />
            <button className="btn" onClick={this.show}/>
          </div>
        </div>
        <footer>
          <hr className="footerHR"/>
          <Link className="btn btn-primary" to="/confirmation">Calculate</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);