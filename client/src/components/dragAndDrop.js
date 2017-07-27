import React from 'react';
import { connect } from 'react-redux';
import Sortable from 'sortablejs';
import { Link } from 'react-router-dom';

//TODO
//if items still in the items list disable confirm button


const mapStateToProps = state => {
  return {

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
      items: ['adfs 1', 'wrerr 4', 'etht 8', 'rwerwe 09'],
      people: ['kai', 'joe', 'minji', 'carlos'],
    };
  }

  componentDidMount() {
    //items list
    var divList = document.getElementById('itemsList');
    Sortable.create(divList, {group: 'test'});

    //dynamic list by person
    var peopleDiv = document.createElement('div');
    this.state.people.map((person, index) => {
      var containerDiv = document.createElement('div');
      containerDiv.className = 'containerDivPadding';

      var titleDiv = document.createElement('div');
      titleDiv.className = 'containerTitle list-group-item boldItemsHeaders';
      titleDiv.append(person);
      containerDiv.append(titleDiv);

      var personList = document.createElement('div');
      personList.className = 'list-group-item';
      personList.id = person + index;
      containerDiv.append(personList);
      Sortable.create(personList, {group: 'test'});

      peopleDiv.append(containerDiv);
    });

    var target = document.getElementById('peopleListContainer');
    target.append(peopleDiv);
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
              <div className="list-group-item boldItemsHeaders containerTitle">
                <p className="boldItemsHeaders">Items</p>
              </div>
              <div id="itemsList">
                { 
                  this.state.items.map((item, index) => (
                    <div className="list-group-item" key={index}>{item}</div>
                  ))
                }
              </div>
            </div>
            <div id="peopleListContainer" className="col-xs-6">

            </div>
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