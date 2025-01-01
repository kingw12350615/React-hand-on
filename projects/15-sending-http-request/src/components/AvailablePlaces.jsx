import Places from './Places.jsx';
import { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvaliablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() =>{
    
    // use async/await to fetch data(more readable)
    async function fetchData(){
      setIsFetching(true);
      try{
        
        const availablePlaces = await fetchAvaliablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(availablePlaces, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch(error) {
        setIsFetching(false);
        setError(error);
      }
      
    }

    fetchData();

    // use then/catch to fetch data
    // fetch('http://localhost:3000/places')
    // .then(response => response.json())
    // .then(resData => setAvailablePlaces(resData.places))

  }, []);

  if(error){
    return <ErrorPage title="Error occurred" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
