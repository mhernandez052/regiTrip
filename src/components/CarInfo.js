import React from 'react';
// import React, { Component } from 'react';


class CarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      carMPG: '',
      carRange: '',
      origin: '',
      destination: ''
    };
    this.handleChangeCarMPG = this.handleChangeCarMPG.bind(this);
    this.handleChangeCarRange = this.handleChangeCarRange.bind(this);
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCarMPG(event) {
    this.setState({ carMPG: event.target.value });
  }
  handleChangeCarRange(event) {
    this.setState({ carRange: event.target.value });
  }
  handleChangeOrigin(event) {
    this.setState({ origin: event.target.value });
  }
  handleChangeDestination(event) {
    this.setState({ destination: event.target.value });
  }

  handleSubmit(event) {
    var mpgMessage = 'Car MPG: ' + this.state.carMPG;
    var rangeMessage = '\nRange: ' + this.state.carRange;
    var originMessage = '\nOrigin: ' + this.state.origin;
    var destMessage = '\nDestination: ' + this.state.destination;
    alert(mpgMessage + rangeMessage + originMessage + destMessage);
    this.getGasPrices()
    event.preventDefault();
  }

  getGasPrices = () => {
    console.log("\nGas price...Starting\n")
    fetch("http://devapi.mygasfeed.com/stations/radius/38.589565/-121.489270/10/reg/price/rfej9napna.json")
    .then(res => res.json())
    .then(result => {
      console.log(result);
    })
    console.log("\nGas price...Finished\n")
  }

  getPlaces  = () => {
    console.log("\nPlaces...Starting\n")
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.589565,-121.489270&radius=40000&keyword=gas&key=AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA")
    .then(res => res.json())
    .then(result => {
      console.log(result);
    })
    console.log("\nPlaces...Finished\n")
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Vehicle Combined MPG: <br />
            <input type="text" value={this.state.carMPG} onChange={this.handleChangeCarMPG} />
          </label>
          <br />
          <label> Vehicle Range <br />
            <input type="text" value={this.state.carRange} onChange={this.handleChangeCarRange} />
          </label>
          <br />
          <label> Origin <br />
            <input type="text" value={this.state.origin} onChange={this.handleChangeOrigin} />
          </label>
          <br />
          <label> Destination <br />
            <input type="text" value={this.state.destination} onChange={this.handleChangeDestination} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>

        <button type = "button" onClick = {this.getGasPrices}> Get Gas Prices </button>
        <button type = "button" onClick = {this.getPlaces}> Get Places</button>

      </div>
    );
  }
}
export default CarInfo;


