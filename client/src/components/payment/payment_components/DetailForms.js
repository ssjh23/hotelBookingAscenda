import { inputs, paymentInfo, billingAddress } from "./FormInputFormat";
import { generateRandomString } from "./GenRandomString";
import Form from "./Form";
import {validation} from './FormsValidation';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/detailforms.css';

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        'Accept': "application/json",
        body: JSON.stringify(data),
    })
    return response.json();
};

function findNumberOfNights(date1, date2) {
    const difference = date2.getTime() - date1.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays;
}

const DetailForms = () => {

    const navigate = useNavigate();
    const { feature2Data, feature3Data } = useLocation().state;
    const { destinationID, id, name, longitude, latitude, address, rating, description, amenities_ratings, descriptionArr, images, priceArr, breakfastInfo, keyArr, feature1params } = feature2Data;
    const { price, roomType } = feature3Data;
    console.log("roomType: ",roomType);
    console.log()
    const { searchBarResult, startDateResult, endDateResult, roomsResult, adultsResult, childrenResult, currencyResult } = feature1params;
    console.log("adults: ",adultsResult);
    console.log("searchBarResult: ",searchBarResult);

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        requests: '',
        creditCardNumber: '',
        expiryDate: '',
        cvc: '',
        streetName: '',
        streetNumber: '',
        postalCode: '',
    });

    const handleChange = (event) => {
        const {valid, msg} = validation(event);
        if (valid) {
            setState(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
            console.log("Updated succesfully");
        }
        else {
            alert(msg);
            event.target.value = "";
        }
    }

    const handleSubmit = (event) => {
        // alert(`User submitted: ${state.firstName}, ${state.lastName}, ${state.phoneNumber}, ${state.emailAddress}, ${state.requests}`);
        event.preventDefault();
        
        const userID = generateRandomString(6);
        const numberOfNights = findNumberOfNights(startDateResult, endDateResult);

        const customer = {
            firstName: state.firstName,
            lastName: state.lastName,
            phoneNumber: state.phoneNumber,
            emailAddress: state.emailAddress,
            requests: state.requests,
            creditCardNumber: state.creditCardNumber,
            expiryDate: state.expiryDate,
            cvc: state.cvc,
            streetName: state.streetName,
            streetNumber: state.streetNumber,
            postalCode: state.postalCode,
            uniqueID: userID,
            destinationID: destinationID,
            hotelName: name,
            hotelID: id,
            numberOfNights: numberOfNights,
            startDate: startDateResult,
            endDate: endDateResult,
            numberOfGuests: adultsResult+childrenResult,
            roomType: roomType,
            cost: price,
            currency: currencyResult,
            location: searchBarResult,
        }

        postData('http://localhost:7788/sendemail',customer)
            .then( data => {
                console.log("Email request sent!");
                console.log(data)
            })

        postData('http://localhost:7788/record/add', customer)
            .then( data => {
                console.log(data);
                navigate("/hotels/payment_successful", {state: customer, replace: true});
                //window.location.href = "/hotels/payment_succesful";
        });
    }
    
    return (
        <div className="main-container">
            <div className="subcontainer">
                <h1 className="text-container">Booking Confirmation</h1>
                <form className="form-container" onSubmit={handleSubmit}>
                    <label className="personal-details-label">Personal Details</label>
                    {inputs.map((input) => (
                        <Form classname="form-1"
                        key={input.id}
                        type={input.type}
                        name={input.name}
                        label={input.label}
                        placeholder={input.label}
                        maxLength={input.maxLength}
                        value={state[input.name]}
                        onChange={handleChange}/>
                    ))}
                    <br></br>
                    <label className="payment-information-label">Payment Information</label>
                    {paymentInfo.map((info) => (
                        <Form className='form-2'
                        key={info.id}
                        type={info.type}
                        name={info.name}
                        label={info.label}
                        placeholder={info.label}
                        maxLength={info.maxLength}
                        value={state[info.name]}
                        onChange={handleChange}/>
                    ))}
                    <br></br>
                    <label className="billing-address-label">Billing Address</label>
                    {billingAddress.map((info) => (
                        <Form className='form-3'
                        key={info.id}
                        type={info.type}
                        name={info.name}
                        label={info.label}
                        placeholder={info.label}
                        maxLength={info.maxLength}
                        value={state[info.name]}
                        onChange={handleChange}/>
                    ))}
                    <br></br>
                    <div className='requestsDivider'>
                        <label>Requests to Hotel</label>
                        <textarea className="requests" value={state.requests} name='requests' id='requests' onChange={handleChange}/>
                    </div>
                    <button type='submit' name="confirmBookingButton" className="confirm-button">Confirm Booking</button>
                </form>
            </div>
        </div>
        
    );
}

export default DetailForms;