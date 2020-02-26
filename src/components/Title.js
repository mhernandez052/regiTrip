import React from 'react';

class Title extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props)
  }
  render() {
    return (
      <div>
        <h1>Senior Project</h1>
      </div>
    )
  }
}
export default Title;
