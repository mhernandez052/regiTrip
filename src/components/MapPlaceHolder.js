import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CustomMarker from './CustomMarker';

import './MapPlaceHolder.css';

class MapPlaceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 1

      // {this.state.teams.map(teams =>
      //   <tr key = {teams.id} className =
      //     {this.state.curTeamID === teams.id ? "curTeam" : "notCurTeam"} >
      //   <td>{teams.teamName}</td>
      //   <td>{teams.teamState}</td>
      //   </tr>
      // )}
    };
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    let curProps = this.props;
    let curCoords = [curProps.originLat, curProps.originLng, curProps.destLat, curProps.destLng];
    let prevCoords = [prevProps.originLat, prevProps.originLng, prevProps.destLat, prevProps.destLng];
    // console.log(this.props);
    if (!(curCoords.includes(null) || curCoords.includes(undefined))) {
      if (!(JSON.stringify(curCoords) === JSON.stringify(prevCoords))) {
        let newLat = (curCoords[0] + curCoords[2]) / 2.0;
        let newLng = (curCoords[1] + curCoords[3]) / 2.0;
        let newCenter = { lat: newLat, lng: newLng };
        // Calculate new zoom here when you get a chance
        // https://stackblitz.com/edit/react-google-maps-bounds?file=Hello.js
        this.setState({ center: newCenter });
        this.setState({ zoom: 5 });
      }
    }
    // curProps.listGasStations.len
    // if (curProps.listGasStations.len !== prevProps.listGasStations.len) {
    //   console.log("Update State mark");
    // }
  }


  render() {
    // if (this.state.loading) {
    //   return <div>loading...</div>;
    // }
    if (this.props.listGasStations) {
      console.log(this.props.listGasStations);
    }
    const p = this.props.listGasStations.map(d => (
      <p>
        {d.address}
        {", " + d.city}
        {" $ " + d.reg_price}
      </p>
    ))

    return (
      // Important! Always set the container height explicitly
      <div>
        <div className="location">

          <p>
            Gas Stations
          </p>
          {p}
        </div>
        <div style={{ height: '80vh', width: '90%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCo-D9CXQAmJifdiIlYVAAA69xCCHKjZBA' }}
            defaultCenter={{ lat: 0, lng: 0 }}
            center={this.state.center}
            zoom={this.state.zoom}
          // mapTypeId={this.props.mapView}
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
              id={2}
            />
          </GoogleMapReact>
        </div >
      </div>
    );
  }
}


export default MapPlaceHolder;