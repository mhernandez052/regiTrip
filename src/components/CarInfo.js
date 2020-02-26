import React from 'react';
// import React, { Component } from 'react';


class CarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Info  was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Vehicle Combined MPG: <br />
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <label> Vehicle Range <br />
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default CarInfo;


