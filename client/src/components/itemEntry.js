import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import DropdownFriendList from './dropdownFriendList.js';


class ItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "person"
    };
  }

  changeTitle (title) { 
    this.setState({
      title: title
    })
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.item}</td>
        <td>{this.props.item.price}</td>
        <td>
          <DropdownButton bsStyle="success" title={this.state.title} id='split-button-basic-Success'>
            {this.props.friendsInfo ? this.props.friendsInfo.map((friendInfo, index) => {return <DropdownFriendList key={index} changeTitle={this.changeTitle.bind(this)} friendsInfo={friendInfo} /> }): null}
          </DropdownButton>
        </td>
      </tr>
    );
  }
}

export default ItemEntry;