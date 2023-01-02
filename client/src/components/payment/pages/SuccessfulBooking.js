import { Link, useNavigate } from 'react-router-dom';
import "../css/succesful_booking.css"
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Record from '../payment_components/Record';

const SuccessfulBooking = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("We obtain this data from previous page: ",state);

        if (state == undefined){
            navigate("/*")
        }

         // currently i'm deleting all the records so that it only shows the current customer's record
        async function deleteAllRecords() {
        await fetch('http://localhost:7788/delete', {
            method: 'DELETE',
        });
    }

        function recordList() {
            return state.map((record) => {
                return (
                    <Record
                    record={record}
                    key={record._id}
                    />
            )
        })
    }

    }, []);

    if (state == undefined){
        navigate("/*")

    }else{
        return (
            <div className="onSuccess">
                <div className='text-headers'>
                    <h1>Payment is Successful!</h1>
                    <h3>Here are your booking details:</h3>
                    <p className='hidden-unique-id'>{state.uniqueID}</p>
                </div>
                <br></br>
                <div className='table-div'>
                    <Record record={state}/>
                </div>
                <Link to={'/'} className='link'>
                    <button className='return-home-button' onClick={() => {
                        //console.log("Deleting records");
                        //deleteAllRecords();
                    }}>Return Home</button>
                </Link>
            </div>
        );
    }

}

export default SuccessfulBooking;