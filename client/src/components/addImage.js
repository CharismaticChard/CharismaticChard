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
      secondY: null,
      imageFirstX: null, 
      imageFirstY: null, 
      imageSecondX: null,
      imageSecondY: null,
      naturalWidth: null,
      naturalHeight: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectedPosition = this.selectedPosition.bind(this);
    this.imageOnLoad = this.imageOnLoad.bind(this);
    this.sendImagePosition = this.sendImagePosition.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewURL: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  selectedPosition () {

    var imagefirstX  = $(".previewImage")[0].getBoundingClientRect().left   + $(window)['scrollLeft']();
    var imagefirstY  = $(".previewImage")[0].getBoundingClientRect().top    + $(window)['scrollTop']();
    var imagesecondX = $(".previewImage")[0].getBoundingClientRect().right  + $(window)['scrollLeft']();
    var imagesecondY = $(".previewImage")[0].getBoundingClientRect().bottom + $(window)['scrollTop']();

    let link = $('.item-selection');
    let offset = link.offset();
    let top = Number(offset.top);
    let left = Number(offset.left);
    let right = link.width();
    let bottom = link.height();
    right = right + left;
    bottom = bottom + top;

    this.setState({
      firstX: left,
      firstY: top,
      secondX: right,
      secondY: bottom,
      imageFirstX: imagefirstX, 
      imageFirstY: imagefirstY, 
      imageSecondX: imagesecondX,
      imageSecondY: imagesecondY
    });

    

    console.log('*********firstX:   ' +  imagefirstX + '  , firstY: ' + imagefirstY); 
    console.log('X: ' + left + ', Y: ' + top );
    console.log('*********imagesecondX:   ' +  imagesecondX + '  , imagesecondY: ' + imagesecondY); 
    console.log( 'right: ' + right + ', bottom: ' + bottom );

  }

  imageOnLoad ({ target: img }) {
    this.setState({
      dimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }
    });

    console.log('width:', img.offsetHeight);
    console.log('height:', img.offsetWidth);

    console.log('actual width:', img.naturalWidth);
    console.log('actual height:', img.naturalHeight);




  }

  sendImagePosition () {
    console.log("**********************************************************************" );
    console.log('Div.1X:' + this.state.firstX + '   Div.2Y: ' + this.state.firstY );
    console.log('PicX:' + this.state.imageFirstX + '   PicY: ' + this.state.imageFirstY );

    console.log('Div.2X:' + this.state.secondX + '   Div.2Y: ' + this.state.secondY );
    console.log('Pic.2X:' + this.state.imageSecondX + '   Pic.2Y: ' + this.state.imageSecondY );
  }

  render() {
    let image = (
      <div className="col-xs-11 previewImageContainer text-center">
        <p>Take Picture to Continue</p>
      </div>
    );
    
    let { imagePreviewURL } = this.state;
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
          <Button className="col-xs-2" onClick={this.sendImagePosition}> 
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