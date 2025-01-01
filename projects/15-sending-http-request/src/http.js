const API_HOST = 'http://localhost:3000';

export async function fetchAvaliablePlaces(){

    const response = await fetch(`${API_HOST}/places`);

    if(!response.ok){
        throw new Error("Something went wrong when sending api");
    }

    const resData = await response.json();

    return resData.places;
}

export async function updateUserPlaces(places){

    await fetch(`${API_HOST}/user-places`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ places })
    });

}

export async function fetchUserPlaces(){

    const response = await fetch(`${API_HOST}/user-places`);

    if(!response.ok){
        throw new Error("Something went wrong when sending api");
    }

    const resData = await response.json();

    return resData.places;
}