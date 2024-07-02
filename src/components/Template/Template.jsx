import React, { useState } from 'react'
import styles from './Template.module.css';
import { Link } from 'react-router-dom';
import { images } from '../images/images';

function Template() {
    const imagesData = images.slice(0, 5);
    const [selectedId, setSelectedId] = useState(null);
    console.log(selectedId)
    return (<>
        <div className={styles.home_page}>
            <h2>Select Your Character</h2>

            <div className={styles.more_category_wrapper}>
                <div className={styles.category_navbar}>
                    {/* <button>super hero</button>
                    <button>anime</button>
                    <button>hair style</button>     */}
                    <select name="" id="">
                        <option value="">select category</option>
                        <option value="">Super Hero</option>
                        <option value="">Anime</option>
                        <option value="">Hair Style</option>
                    </select>
                    <select name="" id="">
                        <option value="">select gender</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                    </select>
                </div>

            </div>

            <div className={styles.image_wrapper}>
                {imagesData.map((item, id) => {
                    console.log(id==selectedId)
                    return <>
                        <div className={styles.hero_image} key={id} onClick={() => setSelectedId(id)}>
                            <img src={item} alt="hero-image" className={selectedId == id ? styles.selected_img : ""} />
                        </div>
                    </>
                })}
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
                    <button>Generate</button>
                </Link>
            </div>
        </div>
    </>
    )
}

export default Template