import React from 'react';
import './CustomMarker.css';

const CustomMarker = (props: any) => {
  // const { name, color, id } = props;
  const { name } = props;
  return (
    <div className="marker"
      // style={{ backgroundColor: color, cursor: 'pointer'}}
      title={name}
    />
  );
};

export default CustomMarker;