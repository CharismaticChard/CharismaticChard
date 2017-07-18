import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class AddFriends extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="small"  onClick={this.open.bind(this)} >
          Add Friends
        </Button>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a friend</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form horizontal>
              <FormGroup controlId="formInlineName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Friend's Name" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalNumber">
                <Col componentClass={ControlLabel} sm={2}>
                  Number
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="xxx-xxx-xxxx" />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.close.bind(this)}>ADD</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddFriends;

