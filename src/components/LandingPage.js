import React from 'react';
import MapPlaceHolder from './MapPlaceHolder';

import './LandingPage.css';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
// import CarInfo from './CarInfo';

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      originAddress: null,
      originLat: null,
      originLng: null,

      destAddress: null,
      destLat: null,
      destLng: null,

      carCurRange: null,
      carMaxRange: null,
      listGasStations: []

    }
  }
  handleDestAddress = (event) => {
    this.setState({ destAddress: event });
  }

  handleOriginAddress = (event) => {
    this.setState({ originAddress: event })
  }

  handleOriginSelect = async (value) => {
    this.setState({ originAddress: value.description })
    const results = await geocodeByAddress(value.description);
    const latLng = await getLatLng(results[0]);
    this.setState({ originLat: latLng.lat })
    this.setState({ originLng: latLng.lng })
  }

  handleDestSelect = async (value) => {
    this.setState({ destAddress: value.description })
    const results = await geocodeByAddress(value.description);
    const latLng = await getLatLng(results[0]);
    this.setState({ destLat: latLng.lat })
    this.setState({ destLng: latLng.lng })
  }

  handleChangeCurRange = (event) => {
    this.setState({ carCurRange: event.target.value });
  }
  handleChangeMaxRange = (event) => {
    this.setState({ carMaxRange: event.target.value });
  }

  handleSubmit = (event) => {
    // var m1 = '\ncurRange: ' + this.state.carCurRange;
    // var m2 = '\nMax: ' + this.state.carMaxRange;
    var flag = 1;
    for (var key in this.state) {
      if (this.state[key] === null || this.state[key] === "") {
        flag = 0;
      }
    }
    if (flag === 1) {
      console.log("Time to render data");
      this.ParseData();
    }
    // console.log("ht: " + this.state.originLat + this.state.originLng);

    // event.preventDefault();
  }

  ParseData = () => {
    // Start with getting Route
    // var url = "https://maps.googleapis.com/maps/api/directions/json?origin=38.5815719,-121.4943996&destination=Chico,CA&key=AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA"
    var directionsUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    var temp = this.state.originLat + "," + this.state.originLng + "&destination=";
    directionsUrl += temp;
    temp = this.state.destLat + "," + this.state.destLng + "&key=AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA"
    directionsUrl += temp
    // console.log(directionsUrl);
    fetch(directionsUrl)
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })



    // console.log("\nGas price...Starting\n")
    // // /stations/radius/(Latitude)/(Longitude)/(distance)/(fuel type)/(sort by)/apikey.json?callback=?
    // var starturl = "http://devapi.mygasfeed.com/stations/radius/38.589565/-121.489270/10/reg/price/rfej9napna.json?callback=?"
    // var endUrl = ""
    // var final
    // fetch("http://devapi.mygasfeed.com/stations/radius/38.589565/-121.489270/10/reg/price/rfej9napna.json")
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log(result);
    //   })
    // console.log("\nGas price...Finished\n")
  }

  render() {
    return (
      <div>
        <div className="OriginInput">
          <GooglePlacesAutocomplete
            value={this.state.originAddress}
            onSelect={this.handleOriginSelect}
            onChange={this.handleOriginAddress}
            placeholder={"Enter Origin"}
          />
        </div>
        <div className="DestInput">
          <GooglePlacesAutocomplete
            value={this.state.DestAddress}
            onSelect={this.handleDestSelect}
            onChange={this.handleDestAddress}
            placeholder={"Enter Destination"}
          />
        </div>
        <div className="Car Info">
          {/* <form onSubmit={this.handleSubmit}> */}
          <form>
            <label> Current Vehicle Range <br />
              <input
                type="number"
                value={this.state.carCurRange || ''}
                onChange={this.handleChangeCurRange}
              />
            </label>
            <br />
            <label> Max Vehicle Range <br />
              <input
                name="carMaxRange"
                type="number"
                value={this.state.carMaxRange || ''}
                onChange={this.handleChangeMaxRange}
              />
            </label>
            <br />
            {/* <input
              type="submit"
              value="Submit" /> */}
            <button
              type="button"
              onClick={this.handleSubmit}> Submit</button>
          </form>
        </div>
        <div className="MapStyle">
          <MapPlaceHolder {...this.state} />
        </div>
      </div>
    )
  }
}
export default LandingPage;