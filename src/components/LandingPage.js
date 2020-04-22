import React from 'react';
import './LandingPage.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";


class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      lat: null,
      lng: null,
    }
  }
  handleAddress = (event) => {
    this.setState({ address: event });
  }

  handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    // Results holds a bunch of useful data such as address
    // console.log(results)
    this.setState({lat:latLng.lat})
    this.setState({lng:latLng.lng})
  }
  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleAddress}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <p>Latitude: {this.state.lat}</p>
              <p>Longitude: {this.state.lng}</p>

              <input {...getInputProps({ placeholder: "Enter address" })} />

              <div>
                {loading ? <div>Loading...</div> : null}

                {suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#EC758F" : "#ffff"
                  };

                  return (
                    <div className = "AutoFillDropDown" {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    )
  }
}
export default LandingPage;
