import React from 'react';
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
    const results = await geocodeByAddress(value.description);
    const latLng = await getLatLng(results[0]);
    this.setState({ originLat: latLng.lat })
    this.setState({ originLng: latLng.lng })
  }

  handleDestSelect = async (value) => {
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
            inputClassName="AutoFillDropDown"
            suggestionsClassNames={{
              container: 'SuggestionContainer',
              suggestion: 'SuggestionIndividual',
              suggestionActive: 'SuggestionActive'
            }}
          />
        </div>
        <div className="DestInput">
          <GooglePlacesAutocomplete
            value={this.state.DestAddress}
            onSelect={this.handleDestSelect}
            onChange={this.handleDestAddress}
            placeholder={"Enter Destination"}
            inputClassName="AutoFillDropDown"
            suggestionsClassNames={{
              container: 'SuggestionContainer',
              suggestion: 'SuggestionIndividual',
              suggestionActive: 'SuggestionActive',
            }}
          />
        </div>

      </div>
    )
  }
}
export default LandingPage;