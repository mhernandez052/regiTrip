import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapPlaceHolder extends Component {
  static defaultProps = {
    center: {
      lat: 38.433120,
      lng: -121.383029
    },
    zoom: 11
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={38.433120}
            lng={-121.383029}
            text="MARKER"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapPlaceHolder;