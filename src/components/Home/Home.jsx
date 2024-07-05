import React from 'react';
import styles from '../../App.module.css';
import { Link } from 'react-router-dom';
import { images } from '../images/images';
import { useNavigate } from 'react-router-dom';



function Home() {
    // console.log(images)
    const navigate=useNavigate("/camera")
  return (
    <>
    <div className={styles.home_page}>
        <div className={styles.home_wrapper}>
            <h2>A.I. Photo Booth</h2>
           
            <div className={styles.image_wrapper}>
                {images.map((item,id)=>(
                    <div className={styles.hero_image} key={id}>
                    <img src={item} alt="hero-image"  />
                </div>
                ))}
                {/* <div className={styles.hero_image}>
                    <img src="./superHero/superHeroCards/superHeroCard-01.jpg" alt="hero-image" />
                </div>
                <div className={styles.hero_image}>
                    <img src="./superHero/superHeroCards/superHeroCard-02.jpg" alt="hero-image" />
                </div>
                <div className={styles.hero_image}>
                    <img src="./superHero/superHeroCards/superHeroCard-03.jpg" alt="hero-image" />
                </div>
                <div className={styles.hero_image}>
                    <img src="./superHero/superHeroCards/superHeroCard-04.jpg" alt="hero-image" />
                </div>
                <div className={styles.hero_image}>
                    <img src="./superHero/superHeroCards/superHeroCard-05.jpg" alt="hero-image" />
                </div> */}
            </div>
            <div className={styles.button_start}>
              <Link to='/camera'>
              <button>start</button>
              </Link>  
            </div>
            </div>
        </div>
    </>
  )
}

export default Home