import React from 'react'
import styles from './Field.module.scss'

function Field({value,placeholder,onChange}) {
  return (
    <input className={styles.input} type='text' value={value} onChange={onChange} placeholder={placeholder}/>
  )
}

export default Field