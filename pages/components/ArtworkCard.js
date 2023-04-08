import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
import useSWR from 'swr';
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";
const fetcher = (url) => fetch(url).then((res) => res.json()); 
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store'; 
import {useState, useEffect} from 'react';
import { addToFavourites } from '@/lib/userData';
import { removeFromFavourites } from '@/lib/userData';

export function ArtworkCardDetail  (objectID) {
    const { data, error } = useSWR(objectID.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID.objectID}` : null)
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded , setShowAdded] = useState(false);
    // const [showAdded , setShowAdded] = useState(favouritesList.includes(objectID.objectID) ? true : false);
    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID.objectID))
    }, [favouritesList])
    
    
    async function favouritesClicked(){
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID.objectID))
            // setFavouritesList(current => current.filter(fav => fav != objectID.objectID));
            setShowAdded(false);
        }
        else{
            setFavouritesList(await addToFavourites(objectID.objectID))
            // setFavouritesList(current => [...current, objectID.objectID]);
            setShowAdded(true);
        }
    }

    console.log(favouritesList)

    if(error){
        return(
            <>
            <Error statusCode={404} />
            </>
        )
    }
    else if(data == null){
        return(
            <> Null</>
        )
    }
    else{
        return (
            <>
               <Card style={{ width: '100%' , color: 'black'}}>
                {data.primaryImage == "" ? null : <Card.Img variant="top" src={data.primaryImage}/>}
                <Card.Body> 
                    <Card.Title>{data.title  == "undefined" ? "N/A" : data.title}</Card.Title>
                    <Card.Text>
                    <b>Date:</b> {data.objectDate  == undefined ? "N/A" : data.objectDate}
                    <br></br>
                    <b>Classification:</b> {data.classification  == undefined ? "N/A" : data.classification}
                    <br></br>
                    <b>Medium:</b> {data.medium  == undefined ? "N/A" : data.medium}
                    <br></br>
                    <br></br>
                    <b>Artist:</b> {data.artistDisplayName  == undefined ? "N/A" : data.artistDisplayName} 
                    (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" > wiki </a>)                    
                    <br></br>
                    <b>Credit Line:</b> {data.creditLine  == undefined ? "N/A" : data.creditLine}
                    <br></br>
                    <b>Dimensions:</b> {data.dimensions  == undefined ? "N/A" : data.dimensions}
                    <br></br>
                    <Button type="button" variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked} > {showAdded ? "+ Favourite (added)" : "+ Favourite "} </Button>
                    </Card.Text>
                </Card.Body>
                </Card>
            </>
        );
    }
}


export default function ArtworkCard (objectID) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID.objectID}`, fetcher)
    
    if(error){
        return(
            <>
            <Error statusCode={404} />
            </>
        )
    }
    else if(data == null){
        return(
            <> Null</>
        )
    }
    else{
        let hrefLink = `/artwork/${data.objectID}`
        return (
            <>
               <Card style={{ width: '18rem'}}>
                <Card.Img variant="top" src={data.primaryImageSmall == "" ? "https://via.placeholder.com/375x375.png?text=[+Not+Available+]" : data.primaryImageSmall} />
                <Card.Body> 
                    <Card.Title>{data.title  == "undefined" ? "N/A" : data.title}</Card.Title>
                    <Card.Text>
                    <b>Date:</b> {data.objectDate  == undefined ? "N/A" : data.objectDate}
                    <br></br>
                    <b>Classification:</b> {data.classification  == undefined ? "N/A" : data.classification}
                    <br></br>
                    <b>Medium:</b> {data.medium  == undefined ? "N/A" : data.medium}
                    </Card.Text>
                    <Link href={hrefLink} passHref> <Button variant="primary"><b>ID:</b> {data.objectID}</Button> </Link>
                </Card.Body>
                </Card>
            </>
        );
    }
  }


