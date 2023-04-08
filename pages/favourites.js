import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkCard from './components/ArtworkCard';
import Card from 'react-bootstrap/Card';

export default function Favourites () {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    return (
        <>
            <Row className="gy-4">
                {favouritesList.length > 0 ?(
                    (favouritesList.map((item) => {
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



            
        </>
    );
  }


