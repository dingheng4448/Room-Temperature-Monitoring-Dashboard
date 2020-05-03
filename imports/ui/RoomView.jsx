import React from "react";

class Room extends React.Component{
  constructor(props) {
		super(props);
		
  }
  render() {
    return (

      <div className="room" id={`room-${this.props.roomNum}`} onClick={this.props.onClick} style={{backgroundColor: this.props.colour}}>
        <h3>R {this.props.roomNum}</h3>
      </div>
    );
  }
}

export default Room;
