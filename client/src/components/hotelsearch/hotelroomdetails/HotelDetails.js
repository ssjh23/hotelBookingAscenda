import Map from '../map/Map';
import './rooms.css'
import '../imageslider/ImageSlider.css'
import ImageSlider from '../imageslider/ImageSlider'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HotelDetails = (props) => {

  const { destinationID, id, name, longitude, latitude, address, rating, description, amenities_ratings, descriptionArr, images, priceArr, breakfastInfo, keyArr, feature1params } = props; 
  const navigate = useNavigate(); 

  const {price, setPrice} = useState({price: 0});

  //This function takes in 5 input arrays: [a1, a2, a3, ...], [b1, b2, b3, ...], [c1, c2, c3, ...], [d1, d2, d3, ...], [e1, e2, e3, ...]
  //The function zips the 5 arrays together to produce the output [{a1, b1, c1, d1, e1}, {a2, b2, c2, d2, e2}, ...]
  const zip = (arr1, arr2, arr3, arr4, arr5) => arr1.map((element, index) => {
    return {description: element, images: images[index], price: priceArr[index], breakfast: breakfastInfo[index], key: keyArr[index]};
  });

  const zippedData = zip(descriptionArr, images, priceArr, breakfastInfo);
  // console.log("ZippedData");
  // console.log(zippedData); 

  const handleSubmit = (event) => {
    const data = props;
    console.log("Sending data to feature 4: ",data);
    navigate(`/hotels/${id}/payment_details/${data.key}`, {state: data});
  }

  return (
    <div>
      <div className='hotelDetails'>
        <p className='hotelName'>{name}</p>
        <p className='hotelAddress'>{address}</p>
        <p className='hotelRatings'>{rating}/5</p>
        <p className='hotelPrice'></p>
      </div>
      <div className="description" dangerouslySetInnerHTML={{__html: description}}/>
      <div className="ratings" id="overallRating">
        Overall rating: {rating}
        <div id="amenitiesRatings">
          {amenities_ratings.map(category => {
            return(
              <div key={category.name}>
                {category.name} {category.score}
              </div>
            )
          })}
        </div>
        <Map longitude={longitude} latitude={latitude} /> 
      </div>
      <div>
        {zippedData.map(data => {
          // console.log("Room Image data");
          // console.log(data.images);
          return (
            <div className='imageSliderBackground'>
              <div>
                {data.images.length > 1 ? <ImageSlider images={data.images} /> 
                  : data.images.length == 1 ? <section className='imageSlider'><img className='roomImage' src={data.images[0].url}/></section>
                  : <section className='imageSlider'><img className='roomImage' src='https://2029395.fs1.hubspotusercontent-na1.net/hubfs/2029395/Roomex%20-%20In%20Policy.png'/></section>}
              </div>
              <div className='hotelRoomDetails'>
                <p>{data.description}</p>
                <p className='roomBreakfastDetail'>{data.breakfast === "hotel_detail_room_only" ? "Room Only" : "Breakfast Included"}</p>
                <p>${data.price}</p>
                <button id="bookRoom" onClick={() => {
                  const feature2Data = props;
                  console.log("Hotel price: ",data.price);
                  const feature3Data = {price: data.price, roomType: data.description};
                  console.log("Sending data to feature 4: ",feature2Data);
                  navigate(`/hotels/${id}/payment_details/${data.key}`, {state: {feature2Data: feature2Data, feature3Data: feature3Data}});
                }}>Book now!</button>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>  
  )
}

export default HotelDetails