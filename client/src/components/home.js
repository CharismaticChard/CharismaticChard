import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


class Home extends React.Component {
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-center">
          <h4 className="homeWelcome">Welcome To Splitter</h4>
          <hr className="homeHR"/>
        </div>
        <div className="text-center">
          <Link className="homeSplitButton btn" to="/addImage">Split Image</Link>
        </div>
        <div className="text-center">
          <Link className="homeSplitButton btn" to="/input">Split Manual</Link>
        </div>
      </div>
    );
  }
}

export default Home;