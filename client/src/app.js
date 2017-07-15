import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class App extends React.Component {
  constructor (props) {
    super(props); 
  }

  buttonClick() {
    axios.post('/twilio', sampleDataFormatFromClient)
      .then( function (response) {
        console.log(response);
      })
      .catch( function (response) {
        console.log(response);
      });
  }


  render() {
    return (
      <div>
        <input onClick={this.buttonClick.bind(this)} type="button" value="submit!"/>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));