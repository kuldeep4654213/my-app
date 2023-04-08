// import { getToken } from "@/lib/authenticate";
import { getToken } from "./authenticate";
export async function addToFavourites(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        // body: JSON.stringify({ userName: user, password: password , password2: password2 }),
        headers: {
            Authorization: `JWT ${getToken()}`,
            'content-type': 'application/json',
        },
      });
    
    const data = await res.json();
    if (res.status === 200) {
        // setToken(data.token);
        return data;
    } 
    else {
        return []
        // throw new Error(data.message);
    }
}

export async function removeFromFavourites(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        // body: JSON.stringify({ userName: user, password: password , password2: password2 }),
        headers: {
            Authorization: `JWT ${getToken()}`,
            'content-type': 'application/json',
        },
      });
    
    const data = await res.json();
    if (res.status === 200) {
        // setToken(data.token);
        return data;
    } 
    else {
        return []
        // throw new Error(data.message);
    }
}

export async function getFavourites(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        // body: JSON.stringify({ userName: user, password: password , password2: password2 }),
        headers: {
            'content-type': 'application/json',
            Authorization: `JWT ${getToken()}`,
        },
    });
    
    const data = await res.json();
    if (res.status === 200) {
        // setToken(data.token);
        return data;
    }   
    else {
        return []
        // throw new Error(data.message);
    }
}

export async function addToHistory(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        // body: JSON.stringify({ userName: user, password: password , password2: password2 }),
        headers: {
            Authorization: `JWT ${getToken()}`,
            'content-type': 'application/json',
        },
      });
    
    const data = await res.json();
    if (res.status === 200) {
        // setToken(data.token);
        return data;
    } 
    else {
        return []
        // throw new Error(data.message);
    }
}

export async function removeFromHistory(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        // body: JSON.stringify({ userName: user, password: password , password2: password2 }),
        headers: {
            Authorization: `JWT ${getToken()}`,
            'content-type': 'application/json',
        },
      });
    
    const data = await res.json();
    if (res.status === 200) {
        // setToken(data.token);
        return data;
    } 
    else {
        return []
        // throw new Error(data.message);
    }
}

export async function getHistory(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        // body: JSON.stringify({ userName: user, password: password , password2: password2 }),
        headers: {
            'content-type': 'application/json',
            Authorization: `JWT ${getToken()}`,
        },
      });
      // setToken(data.token);
    const data = await res.json();
    if (res.status === 200) {
        return data;
    } 
    else {
        return []
        // throw new Error(data.message);
    }
}
