import { useState, useEffect } from 'react';
import axios from 'axios';
import ListingDetails from './ListingDetails';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../hotels.css';
import { blockMap, splitFirst50, split50} from './split50';

function FetchHotel() {

    const navigate = useNavigate(); 

    //This retrieves the data passed down from navigate() in FrontPage.js (Feature 1)
    const { state } = useLocation();

    //Page number of data, used to retrieve a set number of data when the user scrolls all the way to the bottom. 
    //Starting value is page 2 as we only use this whenever the user scrolls to the bottom of the page
    const [page, setPage] = useState(1);

    //This is extracting the data passed down from feature 1 
    const { destinationID, type, hotels, feature1params } = state || {};   //*Here//
    console.log(hotels);

    //These are the parameters we are passing in the post request to server.js
    const params = {destinationID, page}; 

    //Stores the data we get back from the post request to server.js
    const [data, setData] = useState([]);

    //Boolean condition to see if there is any more data to load
    const[hasMore, setHasMore] = useState([true]);
    console.log(type);

    // For the first time the page is loaded 
    useEffect(() => {
        if(type !== 'hotel'){
            if (destinationID == undefined || page == undefined){
                navigate("/*")
            }else{
                console.log("Feature 2 Page Loaded")      
            const fetchData = async () => {
                console.log("Data request for hotels sent!");
                await axios.post('http://localhost:7788/api/hotels', params).then(res => {
                    const response = res.data;  
    
                    console.log("Data request for hotels received!");
                    console.log("Here in the first call of split 50, page number =" + page)
    
                    splitFirst50(response, page, setData)   //Splitting function in the split50.js
                    setPage(page+1)
                    
                    
                }).catch(e => {
                    console.log("Failed to fetch hotels data")
                    console.error(e);
                  });
                }
            }
        }


        fetchData();

    }, [])
    
    // Subsequently when the user scrolls down, fetch more data
    const fetchData = async () => {
        console.log("Data request for more hotels sent!");
        await axios.post(`http://localhost:7788/api/hotels`, params).then(res => {
            // console.log(res)
            const response = res.data;

            console.log("Data request for more hotels received!");
            console.log("Here in the second call of split 50, page number =" + page);

            var map = blockMap(response.length)

            setHasMore(split50(response, page, setData, 0, map.get(page)));
            console.log(hasMore);
            setPage(page + 1); // Increase the page by 1 if hasMore == True, which allows us to fetch the next 100 items.

        }).catch(e => {
            console.log("Failed to fetch more hotels data")
            console.error(e);            
        })
    }

    return (
        // Standard InfiniteScroll method (Taken from npmjs)
        <div>
            {type !== 'hotel' && <InfiniteScroll
            dataLength = {data.length} //This is important field to render the next data
            next = {fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>No more results.</b>
                </p>
            }
        >
            {data !== undefined && data.map(listing => { // First check if data is not undefined. Then proceed to get the data. 
                const { id, latitude, longitude, name, image_details, address, trustyou, description, amenities_ratings } = listing;
                return (
                    <div>
                        {hotels.map(data => {
                            if(data.id === id){
                                return (<ListingDetails destinationID={destinationID} id={id} latitude={latitude} longitude={longitude} name={name} address={address} rating={trustyou.score.kaligo_overall} key={id} description={description} amenities_ratings={amenities_ratings} lowest_converted_price={data.lowest_converted_price} feature1params={feature1params} />);
                            }
                        })}
                    </div>
                )
            })}
            </InfiniteScroll> }
            {(type === 'hotel' && 
                <ListingDetails destinationID={destinationID} id={hotels.id} latitude={hotels.latitude} longitude={hotels.longitude} name={hotels.name} address={hotels.address} rating={hotels.rating} key={hotels.id} description={hotels.description} amenities_ratings={hotels.amenities_ratings} lowest_converted_price={hotels.lowest_converted_price} feature1params={feature1params}D />)
            }

        </div>

    )
}

export default FetchHotel;