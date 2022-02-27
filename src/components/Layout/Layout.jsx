import React from "react";
import styles from "./Layout.module.scss";
import Header from "../common/Header/Header";
import cn from "classnames";

function Layout({ children, bgImg, heading = "" }) {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.otherPage]: !!heading,
      })}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <Header />
      {heading && <div className={styles.heading}>{heading}</div>}
      {children && <div>{children}</div>}
    </div>
  );
}

export default Layout;
