import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';



class ItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "person"
    };
  }

  changeTitle (e) { 
    this.setState({
      title: e.target.title
    });
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.item}</td>
        <td>{this.props.item.price}</td>
        <td>
          <DropdownButton bsStyle="success" title={this.state.title} id='split-button-basic-Success'>
            {this.props.friendsInfo.map((friendInfo, index) => {return <MenuItem key={index} onClick={this.changeTitle.bind(this)} title={friendInfo.friendName}>{friendInfo.friendName}</MenuItem>; })}
          </DropdownButton>
        </td>
      </tr>
    );
  }
}

export default ItemEntry;
