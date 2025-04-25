import React from "react";
import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <ClipLoader size={50} color={"#2a2a2ab3"} loading={true} />
    </div>
  );
};

export default Loader;
