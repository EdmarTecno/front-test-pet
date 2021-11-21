import React from "react";
const CardData = (props) => {
  return (
    <div className="CardData">
      <div className="spaceCard">CVV {props.cvv}</div>
      <div className="spaceCard">{props.number}</div>
      <div className="spaceCard">{props.name}</div>

      <div className="spaceCard datesVals">
        <div>Month: {props.month}</div>
        <div>Year: {props.year}</div>
      </div>
    </div>
  );
};

export default CardData;
