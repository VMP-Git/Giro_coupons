import React from "react";
import { Link } from "react-router-dom";

const CardIcon = (props) => {
  return (
    <Link to={props.link} className="text-decoration-none">
      <div className={`card text-center ${props.className}`}>
        <div className="card-body">
          {props.children}
          <h6 className="card-title text-capitalize">{props.title}</h6>
          <div className="card-text text-white">
            {" "}
            {/* Set text to white for contrast */}
            {props.text || props.value}
          </div>
          <small className="text-muted">{props.tips}</small>
        </div>
      </div>
    </Link>
  );
};

export default CardIcon;
