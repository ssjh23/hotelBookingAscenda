import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css';

/*
API Tutorial in https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/#render-the-map
Github: https://github.com/mapbox/mapbox-gl-js

*/

function Map(props) {

  const { longitude, latitude } = props;

  //Access Token
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VhbnNvb2poMjMiLCJhIjoiY2w1cmdyc3MzMjZ1aDNrbHZzMWVsaHI3byJ9.RRSFl_TbPjQwozy2LaiWMA';

  //Initial Longitude, Latitude, Zoom of Map
  const mapContainer = useRef(null);
  const map = useRef(null);
  // Change useState to Dynamic Coordinates from API
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(15);
  

  // initialize map only once
  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    /*Set marker options. 
    (Marker API Tutorial in https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)
    Reference Example: https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
    */
    const marker = new mapboxgl.Marker({
      color: "#FFFFFF",
      draggable: false
    }).setLngLat([lng, lat])
      .addTo(map.current);

  });

  //stores the new latitude, longitude, and zoom that you get when a user interacts with the map
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
  <div>
    <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <div ref={mapContainer} className="map-container" />
  </div>
  );
}

export default Map;
