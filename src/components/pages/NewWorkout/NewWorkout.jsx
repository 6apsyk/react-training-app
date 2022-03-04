import React from 'react'
import ReactSelect from 'react-select'
import Layout from '../../Layout/Layout'
import newWorkoutImg from '../../../images/new-workout.jpg'
import styles from './NewWorkout.module.scss'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
      <Layout bgImg={newWorkoutImg} heading='Create New Workout'>
      </Layout>
      
        <form className={styles.wrapper} onSubmit={onSubmit}>
          <Field placeholder='Enter Name' type='text' value={name} required onChange={e => setName(e.target.value)}/>
          <Link className={styles.link} to='/new-exersice'>Add new exercise</Link>
          <ReactSelect
            classNamePrefix='select2-selection'
            placeholder='Exersice...'
            title='Exersice'
            options={[
              {value: 'fdsfd', label: 'Push-ups'},
              {value: 'fdsfdfds', label: 'Pull-ups'},
            ]} 
            value={exercises}
            onChange={setExercises}
            isMulti
          />
          <Button style={{marginTop: '30px'}} appearance='small'>Create</Button>
        </form>
      
      
    </>
      
    
  )
}

export default NewWorkout