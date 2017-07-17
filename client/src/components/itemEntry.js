import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownFriendList from './dropdownFriendList.js';


class ItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "person"
    }
    console.log('props:', this.props.friendsInfo)
  }

  changeTitle () {

  }

  render() {
    return (
      <tr>
        <td>{this.props.item.item}</td>
        <td>{this.props.item.price}</td>
        <td>
          <DropdownButton bsStyle="success"  title={this.state.title} id='split-button-basic-Success'>
             { this.props.friendsInfo !== null ? this.props.friendsInfo.map((friendInfo) => <DropdownFriendList friendsInfo={friendsInfo} /> ) : null }
          </DropdownButton>
        </td>
      </tr>
    );
  }
};

export default ItemEntry;

