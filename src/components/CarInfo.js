import React from 'react';
// import React, { Component } from 'react';


class CarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      carMPG: '',
      carRange: ''
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleChangeCarMPG = this.handleChangeCarMPG.bind(this);
    this.handleChangeCarRange = this.handleChangeCarRange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCarMPG(event) {
    this.setState({ carMPG: event.target.value });
  }

  handleChangeCarRange(event) {
    this.setState({ carRange: event.target.value });
  }

  handleSubmit(event) {
    var mpgMessage = 'Car MPG: ' + this.state.carMPG;
    var rangeMessage = '\nRange: ' + this.state.carRange;
    alert(mpgMessage + rangeMessage);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Vehicle Combined MPG: <br />
          <input type="text" value={this.state.carMPG} onChange={this.handleChangeCarMPG} />
        </label>
        <br />
        {<label> Vehicle Range <br />
          <input type="text" value={this.state.carRange} onChange={this.handleChangeCarRange} />
        </label>}
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default CarInfo;


