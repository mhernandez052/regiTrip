import React from 'react';
import MapPlaceHolder from './MapPlaceHolder';

import './LandingPage.css';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      originAddress: '',
      originLat: null,
      originLng: null,

      destAddress: '',
      destLat: null,
      destLng: null
    }
  }
  handleDestAddress = (event) => {
    this.setState({ destAddress: event });
  }

  handleOriginAddress = (event) => {
    this.setState({ originAddress: event })
  }

  handleOriginSelect = async (value) => {
    this.setState({originAddress:value.description})
    const results = await geocodeByAddress(value.description);
    const latLng = await getLatLng(results[0]);
    this.setState({ originLat: latLng.lat })
    this.setState({ originLng: latLng.lng })
  }
  
  handleDestSelect = async (value) => {
    this.setState({destAddress:value.description})
    const results = await geocodeByAddress(value.description);
    const latLng = await getLatLng(results[0]);
    this.setState({ destLat: latLng.lat })
    this.setState({ destLng: latLng.lng })
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
        {/* var props = { x: 1, y: 1, z:1 };
<Component {...props} /> */}
        <div className="MapStyle">
          <MapPlaceHolder {...this.state} />
        </div>
      </div>
    )
  }
}
export default LandingPage;