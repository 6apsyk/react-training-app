import React from "react";
import cn from "classnames";
import styles from "./Alert.module.scss";

function Alert({ type = "success", msg = "You are been successfully" }) {
  return (
    <div
      className={cn(styles.msg, {
        [styles.success]: type === "success",
        [styles.warning]: type === "warning",
        [styles.info]: type === "info",
      })}
    >
      {msg}
    </div>
  );
}

export default Alert;
