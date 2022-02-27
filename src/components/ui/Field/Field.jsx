import React from "react";
import styles from "./Field.module.scss";

function Field({ ...props }) {
  return <input className={styles.input} {...props} />;
}

export default Field;
