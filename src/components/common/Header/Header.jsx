import React from 'react'
import styles from './Header.module.scss'

import userIcon from '../../../images/user.svg'
import { Link } from 'react-router-dom'
import Humburger from '../Humburger/Humburger'

function Header() {
  return (
    <header className={styles.header}>
        <Link to='/'>
            <img src={userIcon} alt="user" />
        </Link>
        <Humburger/>
    </header>
  )
}

export default Header