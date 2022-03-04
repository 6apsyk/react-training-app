import React, { useContext, useEffect, useState} from 'react'
import styles from './Header.module.scss'

import userIcon from '../../../images/user.svg'
import arrowIcon from '../../../images/Arrow.svg'
import { Link, useLocation } from 'react-router-dom'
import Humburger from '../Humburger/Humburger'
import { useAuth } from '../../hooks/useAuth'
import { FirebaseAuthContext } from '../../contexts/firebaseAuth'
import { onAuthStateChanged } from "firebase/auth";

function Header() {

  const auth = useContext(FirebaseAuthContext)
  
  const {pathname} = useLocation()

  const {isAuth, setIsAuth} = useAuth()
  console.log('isAuth', isAuth)

  const [email, setEmail] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && isAuth) {
        localStorage.setItem('email',`${user.email}`)
        setEmail(localStorage.getItem('email'))
      } else {
        setEmail(localStorage.removeItem('email'))
        // setIsAuth(false)
      }
    });

  }, [])
  
  return (
    <header className={styles.header}>
        {pathname === '/' 
        ?
                      <div className={styles.leftIcon}>
                        <Link to={isAuth ? '/profile' : '/auth'}>
                          <img className={styles.image} src={userIcon} alt="user"/>
                        </Link>
                        <span style={{color: 'white', fontSize: 20, marginLeft: 10}}>{email}</span>
                      </div>
                      
          :
                      <div className={styles.leftIcon}>
                        <Link to='/'>
                          <img className={styles.image} src={arrowIcon} alt="arrow"/>
                        </Link>
                        <span style={{color: 'white', fontSize: 20, marginLeft: 10}}>{email}</span>
                      </div>
      }
        
        <Humburger/>
    </header>
  )
}

export default Header