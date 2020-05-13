import React from 'react';
// import React, { Component } from 'react';


class CarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carMaxRange: '',
      carCurRange: '',
      originCoords: {
        lat: 0,
        lng: 0
      }
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCurRange = (event) => {
    this.setState({ carCurRange: event.target.value });
  }
  handleChangeMaxRange = (event) => {
    console.log(event);
    this.setState({ carMaxRange: event.target.value });
  }

  async componentDidMount() {
    const url = "https://api.randomuser.me/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // this.setState({ person: data.results[0], loading: false });
  }

  handleSubmit = (event) => {
    var m1 = '\ncurRange: ' + this.state.carCurRange;
    var m2 = '\nMax: ' + this.state.carMaxRange;

    alert(m1 + m2);
    // this.props.listGasStations = ["Blue"]
    // this.getGasPrices()
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

  getPlaces = () => {
    console.log("\nPlaces...Starting\n")
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.589565,-121.489270&radius=40000&keyword=gas&key=AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA")
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })
    console.log("\nPlaces...Finished\n")
  }


  render() {
    // if (this.state.loading) {
    //   return <div>loading...</div>;
    // }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label> Current Vehicle Range <br />
            <input type="text" value={this.state.carCurRange} onChange={this.handleChangeCurRange} />
          </label>
          <br />
          <label> Max Vehicle Range <br />
            <input type="text" value={this.state.carMaxRange} onChange={this.handleChangeMaxRange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>

        <button type="button" onClick={this.getGasPrices}> Get Gas Prices </button>
        <button type="button" onClick={this.getPlaces}> Get Places</button>

      </div>
    );
  }
}
export default CarInfo;


