import React from 'react';
import { Button, Modal, Table, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import AddFriendsByUserButton from './addFriendsByUser.js';
import { connect } from 'react-redux';
import { setFriendsInfo } from '../actions/outputActions.js';
import { AsYouTypeFormatter, PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
const formatter = new AsYouTypeFormatter('US');
const phoneUtil = PhoneNumberUtil.getInstance();

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFriendsInfo: (input) => dispatch(
      setFriendsInfo(input)
    ),
  };
};

export class AddFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: null,
      number: null,
      validationState: null
    };
  }

  handleAdd(e) {
    e.preventDefault();
    this.saveFriendInfo();
    this.setState({
      name: '',
      number: '',
      validationState: null
    });
    this.toggle();
  }

  handleFailAdd(e) {
    e.preventDefault();
    this.setState({
      validationState: 'error'
    });
  }

  friendName(e) {
    this.setState({
      name: e.target.value
    });
  }

  friendNumber(e) {
    let temp = phoneUtil.parse(e.target.value, 'US');
    console.log(phoneUtil.parse(e.target.value, 'US'));
    this.setState({
      number: e.target.value,
      validationState: null
    });
  }

  saveFriendInfo() {
    let friendInformation = {
      friendName: this.state.name,
      friendNumber: this.state.number
    };
    this.props.setFriendsInfo(friendInformation);
  }

  toggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      <div className="row text-center">
        <div className="col-xs-12">
          <div className="row">
            <Button id="add-friends" bsStyle="primary" bsSize="small" onClick={this.toggle.bind(this)}>
              Add Friends
            </Button>
          </div>
          <AddFriendsByUserButton />
          <div className="row">
            <Modal show={this.state.showModal} onHide={this.toggle.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Add a friend</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal onSubmit={this.toggle.bind(this)}>
                  <FormGroup controlId="formName">
                    <Col componentClass={ControlLabel} sm={2}>
                      Name
                    </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="Friend's Name" onChange={this.friendName.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formPhoneNumber" validationState={this.state.validationState}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Number
                    </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="xxx-xxx-xxxx" onChange={this.friendNumber.bind(this)} value={this.state.number}/>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.handleAdd.bind(this)}>ADD</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
