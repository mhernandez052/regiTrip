import React from 'react';

class Title extends React.Component {    
  constructor(props) {
      super(props)

      console.log(this.props)
  }
render(){
  return(
    <p>Title Component</p>
  )
}

}
export default Title;
