import React from 'react';
import Button from 'react-bootstrap/lib/Button';
// import Sidebar from 'react-sidebar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Modal from 'react-bootstrap/lib/Modal';


class MainSidebars extends React.Component {


  constructor(props, context) {
    super(props, context);
    
    this.state = {
      isVisible: false,
    };
  }
  
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  render() {
    return (
      <div className='Sidebar-demo'>
        <Button onClick={ () => this.updateModal(true) }>Display Modal Dialog</Button>
        <SidebarHepler side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
          <Nav>
            <NavItem href='#'>Item 1</NavItem>
            <NavItem href='#'>Item 2</NavItem>
            <NavItem href='#'>Item 3</NavItem>
            <NavItem href='#'>Item 4</NavItem>
            <NavItem href='#'>Item 5</NavItem>
          </Nav>
        </SidebarHepler>
      </div>
    );
  }
}



class SidebarHepler extends React.Component {
  render() {
    return (
      <Modal className='Sidebar left' show={ this.props.isVisible } onHide={this.props.onHide} autoFocus keyboard>
        <Modal.Header closeButton>
          <Modal.Title>Sidebar Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.props.children }
        </Modal.Body>
      </Modal>
    );
  }
}


export default MainSidebars;





// const {
//   Button,
//   Modal,
//   Nav,
//   NavItem
// } = ReactBootstrap;


// class SidebarDemo extends React.Component {
// constructor(props, context) {
//     super(props, context);
    
//     this.state = {
//       isVisible: false,
//     };
//   }
  
//   updateModal(isVisible) {
//     this.state.isVisible = isVisible;
//     this.forceUpdate();
//   }
  
//     render() {
//     return (
//         <div className='Sidebar-demo'>
//         <Button onClick={ () => this.updateModal(true) }>Display Modal Dialog</Button>
//         <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
//             <Nav>
//             <NavItem href='#'>Item 1</NavItem>
//             <NavItem href='#'>Item 2</NavItem>
//             <NavItem href='#'>Item 3</NavItem>
//             <NavItem href='#'>Item 4</NavItem>
//             <NavItem href='#'>Item 5</NavItem>
//           </Nav>
//         </Sidebar>
//       </div>
//     );
//   }
//}

// ReactDOM.render(
//   <SidebarDemo />,
//   document.getElementById('container')
// );