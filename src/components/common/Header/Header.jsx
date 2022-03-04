import styles from './Header.module.scss'

import userIcon from '../../../images/user.svg'
import arrowIcon from '../../../images/Arrow.svg'
import { Link, useLocation } from 'react-router-dom'
import Humburger from '../Humburger/Humburger'

import { useSelector } from 'react-redux'

import { useNavigate } from "react-router-dom";


function Header() {

  let navigate = useNavigate();

  const { isAuth, userEmail } = useSelector(state => state.app);

  const {pathname} = useLocation()

  return (
    <header className={styles.header}>
        {pathname === '/' 
        ?
                      <div className={styles.leftIcon}>
                        {!isAuth && <Link to={isAuth ? '/profile' : '/auth'}>
                          <img className={styles.image} src={userIcon} alt="user"/>
                        </Link>}
                        <span className={styles.span} onClick={()=> navigate('/profile')}>{userEmail}</span>
                      </div>
                      
          :
                      <div className={styles.leftIcon}>
                        {!isAuth && <Link to='/'>
                          <img className={styles.image} src={arrowIcon} alt="arrow"/>
                        </Link>}
                        <span className={styles.span} onClick={()=> navigate('/profile')}>{userEmail}</span>
                      </div>
      }
        
        <Humburger/>
    </header>
  )
}

export default Header