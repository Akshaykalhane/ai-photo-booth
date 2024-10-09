import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styles from './App.module.css'
import Routing from './Routing'
import Transition from './components/utility/Transition'
// import MyApp  from "my-react-component-package"
// import { useLocation } from 'react-router-dom';
// import Plausible from 'plausible-tracker';

// const plausible = Plausible({
//   domain: 'yourdomain.com',
// });


function App() {

  // const location = useLocation();

  // useEffect(() => {
  //   // Track page view when the route changes
  //   plausible.trackPageview({
  //     url: location.pathname,
  //   });
  // }, [location]);

  
  return (
    <>
    <div className={styles.main_container}>
      <div className={styles.circle_animate}>
        <div className={styles.circle}></div>
        {/* <div className={styles.circle}></div> */}
        {/* <MyApp /> */}
      </div>
        <Routing />
        <div className={styles.circle_animate2}>
        <div className={styles.circle}></div>
        {/* <div className={styles.circle}></div> */}
      </div>
    </div>
    </>
  )
}

export default App
