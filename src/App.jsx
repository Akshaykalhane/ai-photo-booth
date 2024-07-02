import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './App.module.css'
import Routing from './Routing'

function App() {
  
  return (
    <>
    <div className={styles.main_container}>
        <Routing />
    </div>
    </>
  )
}

export default App
