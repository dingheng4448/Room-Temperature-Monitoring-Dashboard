import React from "react";

function Corridor(props) {
  return (
    <div className="corridor" id={`corridor-${props.name}`}>
      <h3>{props.name}</h3>
    </div>
  );
}

export default Corridor;
