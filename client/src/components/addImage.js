import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
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
      imagePreviewURL: '',
      dimensions: {},
      firstX: null,
      firstY: null,
      secondX: null,
      secondY: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectedPosition = this.selectedPosition.bind(this);
    this.imageOnLoad = this.imageOnLoad.bind(this);
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

  selectedPosition () {
    let link = $('.item-selection');
    let offset = link.offset();
    let top = Number(offset.top);
    let left = Number(offset.left);
    let right = link.css('width');
    let bottom = link.css('height');
    right = Number(right.slice(0, right.length - 3)) + left;
    bottom = Number(bottom.slice(0, bottom.length - 3)) + top;
    let position = $('.item-selection').position();
    this.setState({
      firstX: left,
      firstY: top,
      secondX: right,
      secondY: bottom
    });
    console.log('X: ' + left + ', Y: ' + top );
    console.log( 'right: ' + right + ', bottom: ' + bottom );
  }

  imageOnLoad ({ target: img }) {
    this.setState({
      dimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth
      }
    });
  }

  render() {
    let image = (
      <div className="col-xs-11 previewImageContainer text-center">
        <p>Take Picture to Continue</p>
      </div>
    );
    
    let { imagePreviewURL } = this.state;
    // console.log('imagePreviewURL', imagePreviewURL)
    if (imagePreviewURL) {
      image = (
        <div className="previewImageContainer">
          <Rnd
            default={{
              x: 50,
              y: 0,
              width: 200,
              height: 50,
            }}
            className="item-selection"
            onDragStop={this.selectedPosition}
            onResizeStop={this.selectedPosition}>
          </Rnd>

          <img className="previewImage" src={imagePreviewURL} onLoad={this.imageOnLoad}/>
          {console.log(this.state.dimensions)}
          <Button className="col-xs-2" > 
            Select
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row previewImageContainer">
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