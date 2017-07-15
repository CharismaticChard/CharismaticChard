import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    numbers: state.numbers.numbers
  };
};

const Input = ({numbers}) => {
  return (
    <div>
      <h1>Hello Input</h1>
      <p>{numbers}</p>
    </div>
  );
};

export default connect(mapStateToProps)(Input);