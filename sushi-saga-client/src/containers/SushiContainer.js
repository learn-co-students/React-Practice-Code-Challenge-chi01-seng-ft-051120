import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {props.sushi.map((sushi) => {
          return <Sushi key={sushi.id} sushi={sushi} handleEaten={props.handleEaten}/>;
        })}
        <MoreButton nextSushi={props.nextSushi}/>
      </div>
    </Fragment>
  );
};

export default SushiContainer;
