const { default: axios } = require("axios");


//API 3.1
const fetchPrice = async(req,res)=>{
    try{
        console.log("Data request for prices received");
        const requestData = req.body;

        if(!req.body){
            return res.status(400).send({status: 'failed'});
        }

        let parameters = paramFormatting(requestData);
        let data;
        let previousData = -1;
        // Ping 5 times until the ping becomes "completed", 3rd Party API inconsistent
        let APICallCount = 0;
        while(true){
            let ping1 = await axios.get("https://hotelapi.loyalty.dev/api/hotels/prices", parameters);
            data = ping1.data
            console.log("Now returning the data from 3rd party API from Ascenda (in fetchPrice.js)")
            // console.log(data); 
            if (previousData == data.hotels.length && data.hotels.length !== 0){
                break;
            }
            previousData = data.hotels.length;
            // APICallCount += 1;
            // if (APICallCount === 5){
            //     break;
            // }
        }

        // console.log(data);
        console.log("Data for prices returned");   
        return data;       

    }catch(err){
        console.error("Error in fetching Price")
        console.error(err.response.status);
        return err;
    }
};

// API 3.2
const fetchRoomPrices = async(req,res)=>{
    try{
        console.log("Data request for rooms received");
        const requestData = req.body;

        if(!req.body){
            return res.status(400).send({status: 'failed'});
        }

        // console.log(requestData);
        console.log(req.body)
        let id;
        if (requestData.searchBarResult[4] === 'hotel'){
            id = requestData.searchBarResult[1]
        }
        else{
            id = requestData.id;
        } 
        let parameters = paramFormatting(requestData);
        console.log(parameters)
        let data;
        let previousData = -1;
        // Ping 5 times until the ping becomes "completed", 3rd Party API inconsistent
        while(true){
            let ping1 = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${id}/price`, parameters);
            data = ping1.data;
            if (data.completed != false){
                break;
            }
        }
        console.log("Data for hotels returned");
        return data;              

    }catch(err){
        console.error(err);

    }
};

const paramFormatting = (requestData) =>{
    total_guests = requestData.adultsResult + requestData.childrenResult;
    // Forming guests param format
    let guests = total_guests.toString();
    for (i = 1; i < requestData.roomsResult; i++){
        guests += "|" + total_guests.toString();
    }
    

    let params = {
        params: {
            destination_id: requestData.searchBarResult[1],
            checkin: requestData.startDateResult.slice(0,10),
            checkout: requestData.endDateResult.slice(0,10),
            lang: "en_US",
            currency: requestData.currencyResult,
            guests: guests,
            partner_id: 3,
            }
        }
    return params
}

module.exports = {fetchPrice, fetchRoomPrices};