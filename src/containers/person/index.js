import React, { Component } from 'react';

class Person extends Component { 
  componentDidMount() {
    document.title = 'Person Tour | Densho Explorer';
  }

  render() {
    return (
      <h1>Person Component </h1>
    );
  }
}

export default Person;