import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { setFriendsInfo, setDebtors } from '../actions/outputActions.js';
import $ from 'jquery';

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo,
    splitter: state.final.splitter, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

class ItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'person',
      item: this.props.item.item,
      price: this.props.item.price
    };
  }

  changeTitle (e) { 
    this.setState({
      name: e.target.title
    }, this.debtor);
  }

  debtor() {
    this.props.collectSplitItemInfo(this.state.name, this.state.item, this.state.price);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-4">{this.props.item.item}</div>
        <div className="col-xs-4">{this.props.item.price}</div>
        <div className="col-xs-4">
          <DropdownButton
            bsStyle="success"
            title={this.state.name}
            id="split-button-basic-Success"
            className="dropdownBtn"
          >
            <MenuItem
              onClick={this.changeTitle.bind(this)}
              title={this.props.splitter.name.split(' ')[0]}
            >
              {this.props.splitter.name.split(' ')[0]}
            </MenuItem>
            {
              this.props.friendsInfo.map((friendInfo, index) => ( 
                <MenuItem 
                  key={index} 
                  onClick={this.changeTitle.bind(this)} 
                  title={friendInfo.friendName}
                >
                  {friendInfo.friendName}
                </MenuItem>
              ))
            }
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEntry);

// <div className="dropdown">
//   <button className="dropdown">
//     Person
//     <span className="caret"></span>
//   </button>
//   <div className="dropdown-content">
//     <a onClick={this.changeTitle.bind(this)}
//         title={this.props.splitter.name.split(' ')[0]}
//     >
//       {this.props.splitter.name.split(' ')[0]}
//     </a>
//     {
//       this.props.friendsInfo.map((friendInfo, index) => (
//         <a
//           key={index}
//           onClick={this.changeTitle.bind(this)}
//           title={friendInfo.friendName}
//         >
//           {friendInfo.friendName}
//         </a>
//       ))
//     }
//   </div>
// </div>

// <div className="dropdown">
//   <button className="btn btn-primary dropdown-toggle" id="split-button-basic-Success" type="button" data-toggle="dropdown">
//     Person
//     <span className="caret"></span>
//   </button>
//   <ul className="dropdown-menu" aria-labelledby="split-button-basic-Success">
//     <li onClick={this.changeTitle.bind(this)}
//         title={this.props.splitter.name.split(' ')[0]}
//     >
//       {this.props.splitter.name.split(' ')[0]}
//     </li>
//     {
//       this.props.friendsInfo.map((friendInfo, index) => (
//         <li
//           key={index}
//           onClick={this.changeTitle.bind(this)}
//           title={friendInfo.friendName}
//         >
//           {friendInfo.friendName}
//         </li>
//       ))
//     }
//   </ul>
// </div>

// <DropdownButton
//   bsStyle="success"
//   title={this.state.name}
//   id="split-button-basic-Success"
// >
//   <MenuItem
//     onClick={this.changeTitle.bind(this)}
//     title={this.props.splitter.name.split(' ')[0]}
//   >
//     {this.props.splitter.name.split(' ')[0]}
//   </MenuItem>
//   {
//     this.props.friendsInfo.map((friendInfo, index) => (
//       <MenuItem
//         key={index}
//         onClick={this.changeTitle.bind(this)}
//         title={friendInfo.friendName}
//       >
//         {friendInfo.friendName}
//       </MenuItem>
//     ))
//   }
// </DropdownButton>