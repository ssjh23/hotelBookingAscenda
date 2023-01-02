import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./datepicker.css"
import "react-datepicker/dist/react-datepicker.css";

//Datepicker package from: 
//DatePicker that 1. Excludes dates before today 2. Selectable Range
export function DatePickerReact(props){
    let dateStarting = new Date();
    let dateEnding = new Date();
    dateStarting.setDate(dateStarting.getDate());
    dateEnding.setDate(dateStarting.getDate() + 1);
    const [startDate, setStartDate] = useState(dateStarting);
    const [endDate, setEndDate] = useState(dateEnding);
    const onStartChangeHandler = (date) =>{
        setStartDate(date)
        //Pass Back to parent component
        props.submitStartDate(date);
    }

    const onEndDateChangeHandler = (date) =>{
        setEndDate(date)
        //Pass Back to parent component
        props.submitEndDate(date)
    }

    //JSX render
    return (
      
    <div className="dateManager">
        <div className="flexbox-date1">
            <h4 className="date-1-header">Check In</h4>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                minDate = {dateStarting}
                onChange={(date) => 
                    onStartChangeHandler(date)
                    }
                selectsStart
                startDate={startDate}
                endDate={endDate}
                />
        </div>
        <div className="flexbox-date2">
            <h4 className="date-2-header">Check Out</h4>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                minDate={dateEnding}
                selected={endDate}
                onChange={(date) => onEndDateChangeHandler(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}

            />
        </div>
    </div>


    
    );
}