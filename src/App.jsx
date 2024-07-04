import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './App.module.css'
import Routing from './Routing'
import Transition from './components/utility/Transition'

function App() {
  
  return (
    <>
    <div className={styles.main_container}>
      <div className={styles.circle_animate}>
        <div className={styles.circle}></div>
        {/* <div className={styles.circle}></div> */}
      </div>
        <Routing />
    </div>
    </>
  )
}

export default App
