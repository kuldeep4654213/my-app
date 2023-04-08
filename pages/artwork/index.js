import Error from 'next/error'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCard from '../components/ArtworkCard';

import validObjectIDList from 'public/data/validObjectIDList.json'

const fetcher = (url) => fetch(url).then((res) => res.json()); 
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination'

let PER_PAGE = 12
export default function Artwork  () {
    const [artworkList, setArtworkList] = useState([]);
    const [page , setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    // let finalQuery = 'artwork?title=true&isOnView=false&isHighlight=false&q=avenger';
    function previous(){
        if (page > 1) {
        setPage(page-1);
        }
    }
    function next(){
        if (page < artworkList.length) {
            setPage(page+1);
        }
    }
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher)
    useEffect(() => {
        let filteredResults = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x));
        if (data != null || data != undefined) {
            let results = []
            
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            

            // for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
            //     const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
            //     results.push(chunk);
            // }
            setArtworkList(results);
            setPage(1)
        }
    }, [data]);

    if(error){
        return(
            <>
            <Error statusCode={404} />
            </>
        )
    }

    else if(data != null || data != undefined){
        return(
            <> 
                <Row className="gy-4">
                    {artworkList.length > 0 ?(
                        (artworkList[page - 1].map((item) => {
                            return <Col lg={3} key={item}><ArtworkCard objectID={item} /></Col>
                        }))

                    ) : (
                        <>
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <h4>Nothing Here</h4>
                                    <Card.Text>
                                        Try searching for something else.
                                    </Card.Text>
                                </Card.Body>
                                
                            </Card>
                        </>
                    )}
                    
                </Row> 
                
                {artworkList.length > 0 ? (
                    <Pagination>
                        <Pagination.Prev onClick={previous}/>
                        <Pagination.Item >{page}</Pagination.Item>
                        <Pagination.Next onClick={next}/>
                    </Pagination>
                ) : (
                    <> Null</>
                )}
            </>
        )
    }

    else{
        return(
            <> Null</>
        )
    }
}