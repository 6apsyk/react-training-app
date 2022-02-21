import React, { useState } from 'react'

import hamburgerIcon from '../../../images/hamburger.svg'
import hamburgerClose from '../../../images/hamburger-close.svg'

import styles from './Humburger.module.scss'
import cn from 'classnames'
import { Link } from 'react-router-dom'


function Humburger() {

const [show,setShow] = useState(false)

const handleLogout = () => {}

  return (
      <div className={styles.wrapper}>
        <button onClick={()=>setShow(show => !show)}>
            <img src={show ? hamburgerClose : hamburgerIcon} alt="hamburger" />
        </button>
        <nav className={cn(styles.menu, {
            [styles.view]: show === true
        })}>
            <ul>
                <li>
                    <Link to='/workouts'>Workout</Link>
                </li>
                <li>
                    <Link to='/new-workout'>Create New</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/'>Logout</Link>
                </li>
            </ul>
        </nav>
      </div>
        
  )
}

export default Humburger