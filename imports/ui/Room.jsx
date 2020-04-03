import React from "react";

function Room(props) {
  return (

    <div className="room" id={`room-${props.roomNum}`} style={{backgroundColor: props.colour}}>
      <h3>R {props.roomNum}</h3>
    </div>
  );
}

export default Room;
