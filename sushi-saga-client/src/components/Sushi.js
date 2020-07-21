import React, { Fragment } from "react";

const Sushi = (props) => {
  const {name, price, img_url, id, isEaten} = props.sushi
  return (
    <div className="sushi">
      <div className="plate" onClick={() => props.handleEaten(props.sushi)}>
        {isEaten === true ? null : (
          <img src={img_url} width="100%" />
        )}
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  );
};

export default Sushi;
