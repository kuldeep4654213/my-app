import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store'; 
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';



export default function History () {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    if(!searchHistory) return null;
    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });
    
    function historyClicked(e, index){
        console.log(e)
        router.push(searchHistory[index])
    }    
    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        // setSearchHistory(current => {
        //     let x = [...current];
        //     x.splice(index, 1)
        //     return x;
        // });

        setSearchHistory(await removeFromHistory(searchHistory[index])) 
    }  
    
    
    console.log(parsedHistory)
    return (
        <>
            {parsedHistory.length > 0 ?(
                <ListGroup>
                {parsedHistory.map((item, index) => {
                    return <ListGroup.Item key = {index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>{Object.keys(item).map(key => (<>{key}: <strong>{item[key]}</strong>&nbsp;</>))} <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item>
                    
                })}
                </ListGroup>

            ) : (

                <>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            <Card.Text>
                                Try searching for some Artwork.
                            </Card.Text>
                        </Card.Body>
                        
                    </Card>
                </>
            )}
        </>
    );
  }


