import React, { useContext, useState } from 'react'

import hamburgerIcon from '../../../images/hamburger.svg'
import hamburgerClose from '../../../images/hamburger-close.svg'

import styles from './Humburger.module.scss'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter'
import { FirebaseAuthContext } from '../../contexts/firebaseAuth'
import { signOut } from 'firebase/auth'
import { useAuth } from '../../hooks/useAuth'


const Humburger =()=> {

const auth = useContext(FirebaseAuthContext)
const {isAuth, setIsAuth} = useAuth()

const {ref, isComponentVisible, setIsComponentVisible} = useOutsideAlerter(false)

const handleLogout = () => {
    signOut(auth)
    .then(() => setIsComponentVisible(false))
    .then(() => setIsAuth(false))
    .catch((error) => console.log('ошибка выхода', error.message))
}

  return (
      <div className={styles.wrapper} ref={ref}>
        <button style={{width: 27, heigth: 27}} onClick={()=>setIsComponentVisible(isComponentVisible => !isComponentVisible)}>
            <img src={isComponentVisible ? hamburgerClose : hamburgerIcon} alt="hamburger" />
        </button>
        <nav className={cn(styles.menu, {
            [styles.view]: isComponentVisible === true
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
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
      </div>
        
  )
}

export default Humburger