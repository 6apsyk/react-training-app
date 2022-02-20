import React from 'react'
import styles from './Header.module.scss'

import userIcon from '../../../images/user.svg'
import hamburgerIcon from '../../../images/hamburger.svg'

function Header() {
  return (
    <header className={styles.header}>
        <button>
            <img src={userIcon} alt="user" />
        </button>
        <button>
            <img src={hamburgerIcon} alt="hamburger" />
        </button>
    </header>
  )
}

export default Header