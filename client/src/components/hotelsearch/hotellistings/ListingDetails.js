import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../hotels.css';

const ListingDetails = (props) => {

    const { destinationID, id, name, longitude, latitude, address, rating, description, amenities_ratings, lowest_converted_price, feature1params } = props;
    const navigate = useNavigate(); 

    return (
        <div className="listingDetails">
            <img className="listingImage" src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P02000183_1.jpeg"/>
            <form className="listingForm">
                <p>Name: {name}</p>
                <p>Address: {address}</p>
                <p>Rating: {rating}/5</p>
                <p>Lowest price: ${lowest_converted_price}</p>
                <button className="selectListing" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/hotels/${id}`, {state: { destinationID: destinationID, id: id, name: name, longitude: longitude, latitude: latitude, address: address, rating: rating, description: description, amenities_ratings: amenities_ratings, feature1params: feature1params}}); 
                }}>Select</button>
            </form>
        </div>
    )
}

ListingDetails.defaultProps = {
    title: "N/A"
}

ListingDetails.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string.isRequired
}

export default ListingDetails