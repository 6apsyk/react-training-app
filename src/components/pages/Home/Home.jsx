import React from 'react'
import Counters from '../../common/Counters/Counters'
import Layout from '../../Layout/Layout'
import Button from '../../ui/Button/Button'
// import bgImg from '../../../images/home-bg.jpg'
import bgImg from '../../../images/bg.jpg'
import styles from './Home.module.scss'

function Home() {
  return (
      <Layout bgImg={bgImg}>
        
        <Button appearance='ligth'>New</Button>
        <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
        <Counters/>
      </Layout>
    
  )
}

export default Home