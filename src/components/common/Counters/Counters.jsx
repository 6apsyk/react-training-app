import React from 'react'
import styles from './Counters.module.scss'


function Counters() {

    const counters = {
        Minutes: 7,
        Level : 'HARD',
        Up: 1
    }

  return (
    <div className={styles.wrapper}>
        {Object.entries(counters).map((el,i) => 
        <div className={styles.count} key={el[0]}>
            <div className={styles.heading}>{el[0]}</div>
            <div className={styles.number}>{el[1]}</div>   
        </div>
        )}
    </div>
  )
}

export default Counters