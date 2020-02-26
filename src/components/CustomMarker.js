import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {CustomMarkerStyle} from './CustomMarkerStyle.js';

export default class CustomMarker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div style={CustomMarkerStyle}>
          {this.props.text}
       </div>
    );
  }
}