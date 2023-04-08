import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArtworkCardDetail } from '../components/ArtworkCard';
import { useRouter } from 'next/router';

export default function ArtworkById () {
    const router = useRouter();
    const { objectID } = router.query;
    return (
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>
        </>
    );
  }
