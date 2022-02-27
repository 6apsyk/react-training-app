import React from 'react'
import styles from './Header.module.scss'

import userIcon from '../../../images/user.svg'
import arrowIcon from '../../../images/Arrow.svg'
import { Link, useLocation } from 'react-router-dom'
import Humburger from '../Humburger/Humburger'

function Header() {
  
  const {pathname} = useLocation()
  
  return (
    <header className={styles.header}>
        {pathname === '/' 
        ?
                      <Link to='/auth'>
                        <img className={styles.image} src={userIcon} alt="user"/>
                      </Link>
           
          :
                      <Link to='/'>
                        <img className={styles.image} src={arrowIcon} alt="arrow"/>
                      </Link>
      }
        <Humburger/>
    </header>
  )
}

export default Header