import { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import './ImageSlider.css'

const ImageSlider = (props) => {
    
    const { images } = props;

    //This removes the duplicate images by converting it to a Set and projecting back to an array.
    const uniqueImageArr = [...new Set(images.map(obj => obj.url))];
 
    //For setting the current slide to be shown 
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        //Check if the current slide is the last slide. If it is, set current slide to 0. If not, increase by 1
        setCurrent(current === uniqueImageArr.length - 1 ? 0 : current + 1); 
    }

    const prevSlide = () => {
        //Same as next slide but the opposite now
        setCurrent(current === 0 ? uniqueImageArr.length - 1 : current - 1);
    }

    return (
        <section className='imageSlider'>
            <FaArrowAltCircleLeft className='leftArrow' onClick={prevSlide}/>  
            <FaArrowAltCircleRight className='rightArrow' onClick={nextSlide}/>
            {uniqueImageArr.map((url, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (
                            <img src={url} alt='travel image' className='roomImage' />
                        )}
                    </div>
                )
            })}
        </section>
    )
}

export default ImageSlider