import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import Rnd from 'react-rnd';
import { imageItem } from '../actions/imageAction.js';


const mapStateToProps = state => {
  return {
    savedImages: state.image.imageItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    imageItem: (input) => dispatch(
      imageItem(input)
    ),
  };
};


class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewURL: '',
      // dimensions: {},
      // divTopX: null,
      // divTopY: null,
      // divBottomX: null,
      // divBottomY: null,
      // imageFirstX: null, 
      // imageFirstY: null, 
      // imageSecondX: null,
      // imageSecondY: null,
      position: null,
      isSelectButtonClick: false
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
    let imagefirstX = $('.previewImage')[0].getBoundingClientRect().left + $(window)['scrollLeft']();
    let imagefirstY = $('.previewImage')[0].getBoundingClientRect().top + $(window)['scrollTop']();
    let imagesecondX = $('.previewImage')[0].getBoundingClientRect().right + $(window)['scrollLeft']();
    let imagesecondY = $('.previewImage')[0].getBoundingClientRect().bottom + $(window)['scrollTop']();

    let link = $('.item-selection');
    let offset = link.offset();
    let divTopY = Number(offset.top);
    let divTopX = Number(offset.left);
    let divBottomX = link.width();
    let divBottomY = link.height();
    divBottomX = divBottomX + divTopX;
    divBottomY = divBottomY + divTopY;

    // this.setState({
    //   divTopX: divTopX,
    //   divTopY: divTopY,
    //   divBottomX: divBottomX,
    //   divBottomY: divBottomY,
    //   imageFirstX: imagefirstX, 
    //   imageFirstY: imagefirstY, 
    //   imageSecondX: imagesecondX,
    //   imageSecondY: imagesecondY
    // });

    this.xRelyRel(divTopX, divTopY, divBottomX, divBottomY, imagefirstX, imagefirstY, imagesecondX, imagesecondY); 

    // console.log('*********firstX:   ' +  imagefirstX + '  , firstY: ' + imagefirstY); 
    // console.log('X: ' + left + ', Y: ' + top );
    // console.log('*********imagesecondX:   ' +  imagesecondX + '  , imagesecondY: ' + imagesecondY); 
    // console.log( 'right: ' + right + ', bottom: ' + bottom );
  }

  xRelyRel (divTopX, divTopY, divBottomX, divBottomY, imagefirstX, imagefirstY, imagesecondX, imagesecondY) {
    let xRel = (imagesecondX - imagefirstX ) / this.state.dimensions.naturalWidth;
    let yRel = (imagesecondY - imagefirstY ) / this.state.dimensions.naturalHeight;
    let topX = ( divTopX - imagefirstX ) / xRel; 
    let topY = ( divTopY - imagefirstY ) / yRel; 


    let bottomX = ( divBottomX - imagefirstX ) / xRel;
    let bottomY = ( divBottomY - imagefirstY ) / yRel;

    this.setState({
      position: {
        topLeft: {
          topX: topX,
          topY: topY
        },
        bottomRight: {
          bottomX: bottomX,
          bottomY: bottomY
        }
      }
    });
    // console.log('topLeft', topLeft); 
    // console.log('bottomY', bottomRight);  
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
  }

  sendImagePosition () {
    this.props.imageItem(this.state.position); 
    this.setState({
      isSelectButtonClick: true
    });
    // console.log("**********************************************************************" );
    // console.log('topLeft:', this.state.position.topLeft);
    // console.log('bottomRight:', this.state.position.bottomRight); 

    // console.log("**********************************************************************" );
    // console.log('Div.1X:' + this.state.divTopX + '   Div.divTopY: ' + this.state.divTopY );
    // console.log('PicX:' + this.state.imageFirstX + '   PicY: ' + this.state.imageFirstY );

    // console.log('Div.divBottomX:' + this.state.divBottomX + '   Div.divBottomY: ' + this.state.divBottomY );
    // console.log('Pic.2X:' + this.state.imageSecondX + '   Pic.2Y: ' + this.state.imageSecondY );
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
          <div className="select-image" > 
            <Button className="col-xs-2" onClick={this.sendImagePosition}> 
            Select
            </Button>
            { this.state.isSelectButtonClick ? <div>{this.props.savedImages.length} items have been saved!</div> : null }
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row previewImageContainer">
            <div className="col-xs-12"> 
              {console.log('********** image length?', this.props.savedImages)}
              {console.log('********** image length?', this.props.savedImages.length)}
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