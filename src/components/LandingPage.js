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

      directions: [],
      listGasStations: [],

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
      // console.log("Time to render data");
      this.ParseData();
    }
    // console.log("ht: " + this.state.originLat + this.state.originLng);

    // event.preventDefault();
  }
  createGasURL = (curLat, curLng) => {
    // http://devapi.mygasfeed.com/stations/radius/38.589565/-121.489270/10/reg/price/rfej9napna.json?callback=?
    let radius = 15;
    var gasUrl = "http://devapi.mygasfeed.com/stations/radius/" + curLat + "/" + curLng + "/" + radius + "/reg/price/rfej9napna.json";
    return gasUrl;
  }

  createdirectionURL = (originLat, originLng, destLat, destLng) => {
    let directionsUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    directionsUrl += originLat + "," + originLng + "&destination=";
    directionsUrl += destLat + "," + destLng + "&key=AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA";
    return directionsUrl;
  }

  checkPriceValid = (regPrice) => {
    if (regPrice === "N\\/A" || regPrice === "N/A") {
      // console.log("invalid price");
      return false
    }
    return true;
  }

  ParseData = () => {
    // Start with getting Route
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let ts = this.state
    let directionAPIUrl = this.createdirectionURL(ts.originLat, ts.originLng, ts.destLat, ts.destLng);
    // console.log(directionAPIUrl);
    var stops = [];
    // Current range at all times in meters
    // https://stackoverflow.com/questions/57075049/how-to-chain-multiple-fetch-promises
    fetch(proxyurl + directionAPIUrl)
      .then(res => res.json())
      .then(result => {
        var steps = result.routes[0].legs[0].steps;
        var remainingRange = this.state.carCurRange * 1609.34;
        for (let i = 0; i < steps.length; i++) {
          // console.log(steps[i].distance.value);
          remainingRange -= steps[i].distance.value;
          if (remainingRange < 48280.3) {
            stops.push(steps[i].end_location);
            remainingRange = this.state.carMaxRange * 1609.34;
          }
        }
        for (let i = 0; i < stops.length; i++) {
          let stopsLat = stops[i].lat;
          let stopsLng = stops[i].lng;
          let gasUrl = this.createGasURL(stopsLat, stopsLng);
          var stationStops = [];
          fetch(gasUrl)
            .then(res1 => res1.json())
            .then(result1 => {
              let gasStationsList = result1.stations;
              for (let i = 0; i < gasStationsList.length; i++) {
                if (this.checkPriceValid(gasStationsList[i].reg_price)) {
                  // this.setState(state => {
                  //   const list = state.list.concat(state.value);
                  this.setState({
                    listGasStations: this.state.listGasStations.concat(gasStationsList[i])
                  });
                  // stationStops.push(gasStationsList[i]);
                  // console.log(gasStationsList[i]);
                  break;
                }
              }
            })
          // console.log("pre fetched")
          // console.log(stationStops);
          // console.log("fetched")
          // this.setState({ listGasStations: stationStops });
        }
        // console.log(this.state.listGasStations);
      })
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