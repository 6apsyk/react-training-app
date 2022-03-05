import { useEffect, useState } from 'react'
import Counters from '../../common/Counters/Counters'
import Layout from '../../Layout/Layout'
import Button from '../../ui/Button/Button'
// import bgImg from '../../../images/home-bg.jpg'
import bgImg from '../../../images/bg.jpg'
import styles from './Home.module.scss'
import { useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  collection,
  
  onSnapshot,
  query,
  where,
 
} from "firebase/firestore";

import {db} from '../../../index'

function Home() {

  const [userStatitic, setUserStatistic] = useState({})

   const { userEmail, isAuth} = useSelector(state => state.app);

  const collectionStatistic = collection(db, "statistic");

  useEffect(() => {
    if(isAuth){
      const q = query(collectionStatistic, where('email', '==', `${userEmail}`));
      onSnapshot(q, (snapshot) => {
        let stat = [];
        snapshot.docs.forEach((doc) => {
          stat.push({ ...doc.data(), id: doc.id });
        });
        setUserStatistic(stat[0])
      });
    }else {
      setUserStatistic({})
    }
    // eslint-disable-next-line 
  }, [isAuth])

  const navigate = useNavigate()
  return (
      <Layout bgImg={bgImg}>
        <Button appearance='ligth' onClick={() => navigate('/new-workout')}>New</Button>
        <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
        {Object.keys(userStatitic).length !== 0 ? <Counters userStatitic={userStatitic}/> : null}
      </Layout>
    
  )
}

export default Home