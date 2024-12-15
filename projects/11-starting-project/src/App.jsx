import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';


const storageKey = 'selectedPlaces';
// Load the selected places from the local storage
// Put this snippet outside of the App component to avoid re-reading the local storage on each render
const selectedIds = JSON.parse(localStorage.getItem(storageKey)) ?? [];
const selectedPlaces = selectedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

function App() {
  const selectedPlace = useRef();
  const [avaliablePlace, setAvaliablePlace] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(selectedPlaces);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Get the user's current location, and sort the places by distance
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvaliablePlace(sortedPlaces);
    })
  }, []);

  function handleStartRemovePlace(id) {
    setIsModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false);
  }

  function handleSelectPlace(id) {

    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    // Save the selected place to the local storage
    const selectedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (selectedItems.indexOf(id) === -1) {
      localStorage.setItem(storageKey, JSON.stringify([id, ...selectedItems]));
    }
  }

  const handleRemovePlace =  useCallback(() => {

    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    setIsModalOpen(false);
    // Remove the selected place from the local storage
    const selectedItems = JSON.parse(localStorage.getItem(storageKey));
    if (selectedItems) {
      localStorage.setItem(storageKey, JSON.stringify(selectedItems.filter((id) => id !== selectedPlace.current)));
    }

  }, []);



  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        {isModalOpen ? 
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        /> : null}
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
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText={'Sorting places by distance...'}
          places={avaliablePlace}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
