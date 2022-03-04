import React from "react";
import img from "../../../images/three-dots.svg";

function Loader() {
  return <img style={{ marginBottom: 20 }} src={img} alt="loader" draggable={false} />;
}

export default Loader;
