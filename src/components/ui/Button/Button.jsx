import React from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'


function Button({children, callback, appearance = 'ligth', className, ...props}) {
  return (
      <div className={styles.wrapper}>
        <button 
            className={cn(styles.button, className,{
                [styles.ligth] : appearance === 'ligth',
                [styles.small] : appearance === 'small',

            })} 
            {...props} 
            >
                {children}
        </button>
      </div>
    
  )
}

export default Button