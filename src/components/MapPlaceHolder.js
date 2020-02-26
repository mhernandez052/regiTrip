import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CustomMarker from './CustomMarker';

class MapPlaceHolder extends Component {
  static defaultProps = {
    center: {
      lat: 38.433120,
      lng: -121.383029
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          disableDefaultUI={true}
          mapTypeControl={true}
          streetViewControl={true}
          // styles=[{featureType = 'poi', elementType = 'labels', stylers = [{ visibility= 'on' }]}]

        // disableDefaultUI: true,
        // mapTypeControl: true,
        // streetViewControl: true,
          // styles: [{featureType: 'poi', elementType: 'labels', stylers: [{visibility: 'on' }] }]
      >
          <CustomMarker
          lat={38.433120}
          lng={-121.383029}
          name="My Marker"
          color="blue" />
        </GoogleMapReact>
      </div >
    );
  }
}

export default MapPlaceHolder;