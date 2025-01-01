import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces, fetchUserPlaces } from './http.js';
import ErrorPage from './components/ErrorPage.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [updatetingError, serErrorUpdating] = useState(null);

  const [getUserPlacesError, setGetUserPlacesError] = useState(null);

  const [isFetching, setIsFetching] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      console.error("WRONG");
      setUserPlaces(userPlaces);
      serErrorUpdating({
        message: error.message || "Something went wrong when sending update api",
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try {
      updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id));
    } catch (error) {
      setUserPlaces(userPlaces);
      serErrorUpdating({
        message: error.message || "Something went wrong when sending update api",
      });
    }
    setModalIsOpen(false);
  }, [userPlaces]);

  function handleUpdatingError(){
    serErrorUpdating(null);
  }

  useEffect(() => {

    async function getUserPlaces(){
      try {
        setIsFetching(true);
        const userPlaces = await fetchUserPlaces();
        setUserPlaces(userPlaces);
      } catch (error) {
        console.error("Get user places error: $s", error.message);
        setGetUserPlacesError({
          message: error.message || "Something went wrong when sending get api",
        });
      }
      setIsFetching(false);
    }
    
    getUserPlaces();

  },[]);

  return (
    <>
      {updatetingError && 
        <Modal open={updatetingError} onClose={handleUpdatingError}>
          <ErrorPage 
            title="An error occurred!" 
            message={updatetingError.message} 
            onConfirm={handleUpdatingError}
          />
        </Modal>
      }
      
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {getUserPlacesError && <ErrorPage title="Error occurred" message={getUserPlacesError.message} />}
        {!getUserPlacesError &&  
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
            isLoading={isFetching}
            loadingText="Loading..."
          />
        }
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
