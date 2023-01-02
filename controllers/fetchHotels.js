const { default: axios } = require("axios");

//API 3.3
const fetchHotels = async(req,res)=>{
    try{
        console.log("Data request for hotels received");
        const requestData = req.body;

        if(!req.body){
            return res.status(400).send({status: 'failed'});
        }

        // console.log(requestData);
        destinationID = requestData.destinationID;
        page = requestData.page; 

        let data;
        // Ping 5 times until the ping becomes "completed", 3rd Party API inconsistent
        let ping1 = await axios.get(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destinationID}`);
        data = ping1.data
        console.log("Now returning the data from 3rd party API from Ascenda (in fetchHotels.js)")

        // console.log(typeof(data))
        console.log("Data for hotels returned");  
        return data;              

    }catch(err){
        console.error("Error in Fetching Hotels")
        console.error(err);
    }
};

//API 3.4
const fetchOneHotel = async(req,res)=>{
    try{
        hotelID = req.params.id;
        console.log(`Data request for ${hotelID} received`);
        // console.log(requestData);

        let data;
        // Ping 5 times until the ping becomes "completed", 3rd Party API inconsistent
        let ping1 = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotelID}`);
        data = ping1.data
        console.log("Now returning the data from 3rd party API from Ascenda (in fetchOneHotel.js)")

        // console.log(typeof(data))
        console.log("Data for hotels returned");
        return data;              

    }catch(err){
        console.error("Error in Fetching Hotels")
        console.error(err);
    }
};
module.exports = {fetchOneHotel,fetchHotels}; 