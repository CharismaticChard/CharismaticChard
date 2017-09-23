import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
import SidebarHelper from './sideBarHelper.js';
import { LinkContainer } from 'react-router-bootstrap';
import { history } from '../actions/historyAction.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    history: (toggle) => dispatch(
      history(toggle)
    ),
  };
};

class MainSidebars extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  historyStateChange() {
    this.props.history(true);
    this.toggleModal();
  }

  historyStateChange() {
    this.props.history(true);
    this.updateModal(false);
  }

  render() {
    return (
      <div className='menuBtn col-xs-12'>
        <div className="col-xs-2 align-middle">
          <div onClick={this.toggleModal} className="nav-item">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <div className="nav row logo-image col-xs-8 menuBtn">
          <Link to="/" >
            <img src="./assets/splitter-logo-white.png" className="homeLogo menuBtn" />
          </Link>
        </div>
        <SidebarHelper side='left' isVisible={this.state.isVisible} onHide={this.toggleModal}>
          <div className="side-bar">
            <div className="bar-profile side-bar-list text-center">
              <a href='/profile' className="bar-list-name">
                Profile
              </a>
            </div>

            <div className="bar-home side-bar-list text-center">
              <Link className="bar-list-name" to="/" onClick={this.toggleModal}>Home</Link>
            </div>

            <div className="bar-history side-bar-list text-center">
              <Link className="bar-list-name" to="/history" onClick={this.historyStateChange.bind(this)}>History</Link>
            </div>

            <div className="bar-logout side-bar-list text-center">
              <a href='/login' className="bar-list-name">
                Log out
              </a>
            </div>
          </div>
        </SidebarHelper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebars);
