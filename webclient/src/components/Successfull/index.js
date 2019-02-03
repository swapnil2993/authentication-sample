import React, { Component } from 'react';


class Successfull extends Component {
  render() {
    return (
      <div>
        <h5 style={{ color: "#009900" }}>Congratulations , your registration is completed</h5>
      </div>
    );
  }
  componentDidMount() {
    localStorage.removeItem("info");
  }
}

export default Successfull;