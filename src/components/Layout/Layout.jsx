import React from 'react'
import styles from './Layout.module.scss'
import Header from '../common/Header/Header'

function Layout({children, bgImg, height}) {
  return (
    <div className={styles.wrapper} style={{height: height, backgroundImage: `url(${bgImg})`}}>
        <Header/>
        <div>
          {children}
        </div>
        
    </div>
  )
}

export default Layout