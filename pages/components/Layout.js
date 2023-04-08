import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
// import ArtworkCard from './ArtworkCard';
import ArtworkCard from './ArtworkCard';
import Artwork from '../artwork/index';
// import {ArtworkCardDetail} from './ArtworkCard';

export default function Layout (props) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {props.children}
            {/* <Artwork/> */}
            </Container>
            <br />
            {/* <ArtworkCardDetail objectID = {647664}/> */}
            {/* <ArtworkCard objectID = {647664}/> */}

        </>
    );
  }
