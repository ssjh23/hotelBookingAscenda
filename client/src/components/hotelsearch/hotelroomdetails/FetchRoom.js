import HotelDetails from "./HotelDetails";
import ImageSlider from "../imageslider/ImageSlider";
import { useState, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom";
import '../hotels.css';
import axios from 'axios'; 

const FetchRoom = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();

  const { destinationID, id, name, longitude, latitude, address, rating, description, amenities_ratings, feature1params} = state || {};
  //These are the parameters we are passing in the post request to server.js
  const params = { feature1params }; 

  const [roomData, setRoomData] = useState([]); 

  const descriptionArr = [];
  const imagesArr = [];
  const priceArr = [];
  const breakfastInfo = []; 
  const keyArr = [];

  // For the first time the page is loaded 
  useEffect(() => {
      console.log("Feature 3 Page Loaded")      
      if(feature1params.searchBarResult[4]!== 'hotel'){
        feature1params.searchBarResult[1] = state.id;
        feature1params.searchBarResult[2] = state.latitude;
        feature1params.searchBarResult[3] = state.longitude;
        feature1params.searchBarResult[4] = 'hotel';
      }
      const fetchData = async () => {
          console.log("Data request for rooms sent!");
          await axios.post('http://localhost:7788/api/hotels/rooms/prices', params.feature1params).then(res => {
              const response = res.data.rooms;
              console.log("Data request for hotels received!");
              console.log(response); 

              if(response.length == 0 || name == null){
                navigate("/*")
              }

              setRoomData(response);
          }).catch(e => {
              console.log("Failed to fetch rooms data")
              console.error(e);
              <Link to='/fail' id='linkToErrorPage'/>
            });
      }

      fetchData();

  }, [])

  if (id == undefined){
    navigate("/*")

  }else{
    const images = roomData.map(res => {
      const { roomNormalizedDescription, images, price, roomAdditionalInfo, key } = res;
      descriptionArr.push(roomNormalizedDescription);
      priceArr.push(price); 
      breakfastInfo.push(roomAdditionalInfo.breakfastInfo);
      keyArr.push(key);
      images.map(url => {
          if(!imagesArr.includes(url)) {
              imagesArr.push(url);
          }
      });
      return images;
    })
  
    return (
      <div>
        <div className="imageSliderBackground">
          <ImageSlider images={imagesArr} /> 
        </div>
        <HotelDetails destinationID={destinationID} id={id} name={name} longitude={longitude} latitude={latitude} address={address} rating={rating} description={description} amenities_ratings={amenities_ratings} descriptionArr={descriptionArr} images={images} priceArr={priceArr} breakfastInfo={breakfastInfo} keyArr={keyArr} feature1params={feature1params}/>
      </div>
    )
  }
}

export default FetchRoom