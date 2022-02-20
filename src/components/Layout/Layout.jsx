import React from 'react'
import styles from './Layout.module.scss'
import Header from '../common/Header/Header'

function Layout({children}) {
  return (
    <div className={styles.wrapper}>
        <Header/>
        {children}
    </div>
  )
}

export default Layout