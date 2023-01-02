import { Searchbar } from './searchbar/searchbar'
import { DatePickerReact } from './datepicker/datepicker';
import { RoomGuestCount } from './roomguestcount/roomguestcount';
import { Currency } from './currency/currency';
import { useState, useEffect } from 'react';
import axios from 'axios'
import {validate} from './Utils/FormValidation';
import data from './destinations.json'
import './frontpage.css';
import { useNavigate, createSearchParams } from 'react-router-dom';

const FrontPage = () => {
  let dateStarting = new Date();
  let dateEnding = new Date();
  dateStarting.setDate(dateStarting.getDate() + 1);
  dateEnding.setDate(dateStarting.getDate() + 1);
  const [searchBarResult, setSearchBarResult] = useState('');
  const [startDateResult,setStartDateResult] = useState(dateStarting);
  const [endDateResult, setEndDateResult] = useState(dateEnding);
  const [roomsResult, setRoomResult] = useState(1);
  const [adultsResult, setAdultsResult] = useState(1);
  const [childrenResult, setChildrenResult] = useState(1);
  const [currencyResult, setCurrencyResult] = useState('SGD');
  const [formErrors, setFormErrors] = useState({});
  const [errorsIsActive, setErrorsIsActive] = useState(false);

  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const submission = {searchBarResult, startDateResult, endDateResult, roomsResult, adultsResult, childrenResult, currencyResult}
    const errors = validate(submission);
    console.log(errors)
    setFormErrors(errors);
    if (Object.keys(errors).length === 0){
        console.log("Data Request Sent")
        let foundCountry = []
        data.every((country) => {
          if(country.term === submission.searchBarResult){
            foundCountry = [country.term, country.uid, country.lat, country.lng, country.type];
            return false;
          }
          return true
        })
        submission.searchBarResult = foundCountry;
        if (submission.searchBarResult[4] === 'hotel'){
          axios.all([
            axios.post('http://localhost:7788/api/hotels/rooms/prices', submission),
            axios.post(`http://localhost:7788/api/hotels/${submission.searchBarResult[1]}`)
          ]).then(axios.spread((priceResponse, detailsResponse) =>{
            const priceJSON = JSON.stringify(priceResponse);
            const detailsJSON = JSON.stringify(detailsResponse);
            const priceObject = JSON.parse(priceJSON);
            const detailsObject = JSON.parse(detailsJSON);
            const price_response = priceObject.data.rooms
            console.log(priceObject.data.rooms);
            console.log(detailsObject.data);
            let room_prices = []
            for (let i = 0; i < price_response.length;i++){
              const roomPrice = price_response[i].lowest_converted_price
              room_prices.push(roomPrice);
            }
            let lowest_room_price = Math.min(...room_prices);;
            const hotel_details = {
              id: detailsObject.data.id,
              latitude: detailsObject.data.latitude,
              longitude: detailsObject.data.longitude,
              name: detailsObject.data.name,
              address: detailsObject.data.address,
              rating: detailsObject.data.trustyou.score.kaligo_overall,
              key:detailsObject.data.id,
              description: detailsObject.data.description,
              amenities_ratings: detailsObject.data.amenities_ratings,
              lowest_converted_price: lowest_room_price
            }
            console.log(hotel_details);
            navigate({
              pathname: "/hotels",
              search: createSearchParams(submission).toString()
            }, {state: {destinationID: submission.searchBarResult[1], type:submission.searchBarResult[4], hotels: hotel_details, feature1params: submission}});

          }))
          .catch(error => console.log(error))
            
            

        }
        else{
          await axios.post('http://localhost:7788/api/hotels/prices', submission).then(res => {
            console.log(`The destination ID is: ${submission.searchBarResult[1]}`);
            console.log((res.data.hotels));
            navigate({
              pathname: "/hotels",
              search: createSearchParams(submission).toString()
            }, {state: {destinationID: submission.searchBarResult[1], type:submission.searchBarResult[4], hotels: res.data.hotels, feature1params: submission}});
          }).catch(e => {
            console.error(e);
          });
        }


    }
    else{
      setErrorsIsActive(true);
      setTimeout(() => {
        // After 3 seconds set the show value to false
        setErrorsIsActive(false)
      }, 2000)
    }

   }
  

  return(
    <div className='flexbox-main'>
      <div className='flexbox-sub-main'>
        <p className='searchbar_error'> {errorsIsActive && formErrors.name} </p>
        <div className='searchbar'>
          <Searchbar submitSearchBar={searchBarResult =>setSearchBarResult(searchBarResult)}/>  
        </div>
        <p className='date_error'> {errorsIsActive && formErrors.date} </p>
        <div className='datepicker'>
         <DatePickerReact 
            submitStartDate={startDateResult =>setStartDateResult(startDateResult)}  
            submitEndDate={endDateResult=> setEndDateResult(endDateResult)}
          />
        </div>
        <p className='guest_error'> {errorsIsActive && formErrors.totalguests} </p>
        <div className='roomguestcount'>
          <RoomGuestCount 
            submitRooms={roomsResult => setRoomResult(roomsResult)}
            submitAdults={adultsResult => setAdultsResult(adultsResult)}
            submitChildren={childrenResult => setChildrenResult(childrenResult)}
          />
        </div>
        <div className='currency'>
          <Currency data={["SGD", "USD", "EUR", "CNY"]} header="Currency" submitCurrency={currencyResult => setCurrencyResult(currencyResult)} />
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <input type="submit" className='submit-button'/>
        </form>

      </div>

    </div>
  )
}


export default FrontPage