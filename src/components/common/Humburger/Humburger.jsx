import React, { useState } from 'react'

import hamburgerIcon from '../../../images/hamburger.svg'
import hamburgerClose from '../../../images/hamburger-close.svg'

import styles from './Humburger.module.scss'
import cn from 'classnames'


function Humburger() {

const [show,setShow] = useState(false)

  return (
      <div className={styles.wrapper}>
        <button onClick={()=>setShow(show => !show)}>
            <img src={show ? hamburgerClose : hamburgerIcon} alt="hamburger" />
        </button>
        <nav className={cn(styles.menu, {
            [styles.view]: show === true
        })}>
            <ul style={{listStyleType: 'none'}}>
                <li>dfgfhf</li>
                <li>dfgfhf</li>
                <li>dfgfhf</li>
                <li>dfgfhf</li>
            </ul>
        </nav>
      </div>
        
  )
}

export default Humburger