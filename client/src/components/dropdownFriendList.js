import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';


class DropdownFriendList extends React.Component {
  constructor(props) {
    super(props); 
  }

  changePersonName(e) {
    this.props.changeTitle(e.target.title);
  }

  render() {
    return (  
      <MenuItem onClick={this.changePersonName.bind(this)} title={this.props.friendsInfo.friendName}>{this.props.friendsInfo.friendName}</MenuItem>  
    );
  }
};


export default DropdownFriendList;
