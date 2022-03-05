import React from "react";
import styles from "./Counters.module.scss";

function Counters({userStatitic}) {

  const {minutes, level, up} = userStatitic

  return (
    <div className={styles.wrapper}>
      
        <div className={styles.count}>
          <div className={styles.heading}>Minutes</div>
          <div className={styles.number}>{minutes}</div>
        </div>
        <div className={styles.count}>
          <div className={styles.heading}>Level</div>
          <div className={styles.number}>{level}</div>
        </div>
        <div className={styles.count}>
          <div className={styles.heading}>Up</div>
          <div className={styles.number}>{up}</div>
        </div>
    
    </div>
  );
}

export default Counters;
