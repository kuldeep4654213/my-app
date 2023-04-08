import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store'; 
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from '@/lib/authenticate';
export default function MainNav() {
    const [isExpanded , setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter()
    let token = readToken();


    async function submitForm(data) {
        setIsExpanded(false);
        data.preventDefault(); 
        let searchField = document.querySelector(".me-2").value
        // let querysearch = `/artwork?title=true&q=${searchField}`
        // setSearchHistory(current => [...current, querysearch]);
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
        router.push(querysearch)
    }


    function logout(){
        setIsExpanded(false);
        removeToken()
        router.push("/login")
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className='fixed-top navbar-dark bg-dark' expanded={isExpanded}>
            <Container fluid>
                <Navbar.Brand>Kuldeep Singh</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setIsExpanded(!isExpanded)}/>
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link></Link>
                    {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link></Link>}
                </Nav>
                &nbsp;
                {token && <Form className="d-flex" onSubmit={submitForm}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form> }
                &nbsp;
                <Nav>
                    {token && <NavDropdown title={token.userName} id="navbarScrollingDropdown">
                        <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item></Link>
                        <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item></Link>
                        <NavDropdown.Item onClick={() => {logout()}}>Logout</NavDropdown.Item>
                    </NavDropdown>}

                    {!token && <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link></Link>}

                    {!token && <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link></Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <br></br>
            <br></br>
        </>
    );
  }
  