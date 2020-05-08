import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CustomMarker from './CustomMarker';

class MapPlaceHolder extends Component {
  static defaultProps = {
    center: {
      lat: 38.589565,
      lng: -121.489270
    },
    zoom: 11,
  };
  constructor(props) {
    super(props);
    this.state = {
      temp: '',

    };
  }

  componentDidUpdate = () => this.checkProps();

  checkProps = () => {
    console.log(this.props)
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div>
        <div style={{ height: '80vh', width: '90%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            mapTypeId={this.props.mapView}
          >
            <CustomMarker
              lat={this.props.originLat}
              lng={this.props.originLng}
              name="Origin"
              color="green"
              id={1}
            />
            <CustomMarker
              lat={this.props.destLat}
              lng={this.props.destLng}
              name="Destination"
              color="green"
              id={1}
            /> 
            {/* <CustomMarker
              lat={38.433120}
              lng={-121.383029}
              name="Conor's House"
              color="green"
              id={1}
            /> */}

          </GoogleMapReact>
        </div >
      </div>
    );
  }
}


export default MapPlaceHolder;