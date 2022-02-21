import React from 'react'
import Layout from '../../Layout/Layout'
import newWorkoutImg from '../../../images/new-workout.jpg'
import styles from './NewWorkout.module.scss'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import { useState } from 'react'

function NewWorkout() {

  const [name,setName] = useState('')
  const [exercises,setExercises] = useState('')
  // Exercises

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <>
      <Layout bgImg={newWorkoutImg}>
          <h1>Create New Workout</h1>
      </Layout>
      <div className={styles.height}>
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <Field placeholder='name' value={name} onChange={e => setName(e.target.value)}/>
        <Field placeholder='exercises' value={exercises} onChange={e => setExercises(e.target.value)}/>
        <Button appearance='small'>Create</Button>
      </form>
      </div>
      
    </>
      
    
  )
}

export default NewWorkout