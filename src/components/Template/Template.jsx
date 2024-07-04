import React, { useState } from 'react'
import styles from './Template.module.css';
import { Link } from 'react-router-dom';
import { superHeroImage, hairStyle ,caricature,professional} from '../images/images';
// import convertToBase64 from '../utility/convertBase64';
import base64 from '../utility/convertBase64';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { image } from 'html2canvas/dist/types/css/types/image';

function Template({ capturedImage, setGeneratedImage, setUrl, generatedImage }) {
    const [selectedId, setSelectedId] = useState(null);
    const [gender, setGender] = useState("");
    const [imagesData, setImagesData] = useState(superHeroImage)
    const [category, setCategory] = useState('superHero');
    const navigate = useNavigate();
    // const [generatedImage,setGeneratedImage]=useState("");
    // let imagesData = superHeroImage;
    // convertToBase64(superHeroImage[0].originalSrc);

    const data = { 
        superHero:superHeroImage,
        hairStyle:hairStyle,
        caricature:caricature,
        professional:professional
     }

    const handleGender = (e) => {
        const gender = e.target.value;
        // if (category == "superHero") {
        //     const data = superHeroImage.filter((hero) => gender ? hero.gender == gender : hero);
        //     setImagesData(data);
        // }
        // if (category == "hairStyle") {
        //     const data = hairStyle.filter((img) => gender ? img.gender == gender : img)
        //     setImagesData(data)
        // }
        if(category){
            const updateData = data[category].filter(item=>item.gender==gender);
            setImagesData(updateData);
        }
        if(gender=="") setImagesData(data[category]); 
        setGender(gender)
    }

    const handleCategory = (e) => {
        const cat = e.target.value;
        let updateData = data[cat];
        if(gender){
            updateData = updateData.filter(item=>item.gender==gender)
            setImagesData(updateData);
        }else{
            setImagesData(updateData)
        }
        // if (cat == 'superHero') {
        //     if (gender) {
        //         console.log('gender hero')
        //         let data = superHeroImage.filter(img => gender ? img.gender == gender : img)
        //         setImagesData(data);
        //     } else {
        //         setImagesData(superHeroImage)
        //     }
        // }
        // if (cat == 'hairStyle') {
        //     if (gender) {
        //         console.log('gender hairstyle')
        //         let data = hairStyle.filter(img => img.gender == gender)
        //         setImagesData(data);
        //     } else {
        //         setImagesData(hairStyle)
        //     }
        //     // setImagesData(hairStyle)
        // }
        if (cat == "") setImagesData(superHeroImage)
        setCategory(cat);
        // setGender("")
    }

    //upload image on server
    const getUrl = url => {
        axios
            .post(
                "https://analytiq4.com/aiphotobooth/aiphotobooth_bluehat/upload.php",
                {
                    img: url,
                }
            )
            .then(function (response) {
                setUrl(response.data.url);
                // console.log("image uploaded on server");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // console.log(capturedImage)


    const handleSubmit = () => {
        let imageSrc = imagesData[selectedId];
        // console.log('handle submit',imageSrc);
        // setGeneratedImage("");
        // handleOriginalImage(imageSrc.originalSrc);
        base64(imageSrc.originalSrc, (base64Data) => {
            try {
                axios
                    .post("https://52.56.108.15/rec",
                        {
                            image: capturedImage.split(",")[1],
                            choice: base64Data.split(",")[1],
                            status: "PREMIUM"
                        }
                    ).then(res => {
                        // console.log('data:image/webp;base64'+res.data.result,'res')
                        setGeneratedImage(`data:/image/webp;base64,${res.data.result}`);
                        getUrl(res.data.result)
                    })
                    .catch((err) => console.log(err))
                navigate('/output');
            } catch (err) {
                console.log(err);
            }
        });
    }

    // console.log(selectedId)
    return (<>
        <div className={styles.home_page}>
            <div className={styles.template_wrapper}>
                <h2>Select Character</h2>
                <div className={styles.more_category_wrapper}>
                    <div className={styles.category_navbar}>
                        {/* <button>super hero</button>
                    <button>anime</button>
                    <button>hair style</button>     */}
                        <select name="" id="" onChange={handleCategory} value={category}>
                            <option value="">select category</option>
                            <option value="superHero">Super Hero</option>
                            {/* <option value="">Anime</option> */}
                            <option value="hairStyle">Hair Style</option>
                            <option value="professional">Professinal</option>
                            <option value="caricature">Caricature</option>
                        </select>
                        <select name="" id="" onChange={handleGender} value={gender}>
                            <option value="">select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                </div>

                <div className={styles.image_wrapper}>
                    {imagesData.map((item, id) => {
                        const { imageSrc, originalSrc, gender } = item;
                        console.log(id)
                        return (
                            <div className={styles.hero_image} key={id} onClick={() => setSelectedId(id)}>
                                <img src={imageSrc} alt="hero-image" className={selectedId == id ? styles.selected_img : ""} />
                            </div>
                        )
                    })}
                    {imagesData.length==0 && <h2>No filter found</h2>}
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
                    {/* <Link to='/camera'> */}
                    <button onClick={handleSubmit} disabled={selectedId + 1 ? false : true}>Generate</button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    </>
    )
}

export default Template;

