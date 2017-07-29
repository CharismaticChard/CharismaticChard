import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
// import Draggable from 'react-draggable';
// import ResizableBox from 'react-resizable-component';
import Rnd from 'react-rnd';

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewURL: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.dragDiv = this.dragDiv.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewURL: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  dragDiv () {

  }

  render() {
    var image = (
      <div className="col-xs-11 previewImageContainer text-center">
        <p>Take Picture to Continue</p>
      </div>
    );
    
    var { imagePreviewURL } = this.state;

    if (imagePreviewURL) {
      image = (
        <div className="previewImageContainer">


          <Rnd
            default={{
              x: 0,
              y: 0,
              width: 320,
              height: 200,
            }}
            className="item-selection">
            You can resize the box
          </Rnd>
          <img className="previewImage" src={imagePreviewURL}/>
          <Button className="col-xs-2"> 
            Select
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <input className="form-control" type="file" accept="image/*" capture="camera" id="camera" placeholder="Take Picture" onChange={this.handleChange} />
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            {image}
          </div>
          <br></br>
          <footer>
            <hr className="footerHR"/>
            <input type="submit" className="btn btn-primary" />
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);