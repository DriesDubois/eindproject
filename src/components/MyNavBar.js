import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useAuthValue} from '../contexts/AuthContext'
import {auth} from "../services/firebase";


export function MyNavBar() {
    const expand = "sm";
    const {currentUser} = useAuthValue()

    return (
        <>
            <Navbar sticky="top" key={expand} expand={expand} className="pb-3" style={{backgroundColor:"rgba(102,102,102,0.6)",fontFamily: "Iceberg",fontSize:"22px",fontWeight:"bold",fontTransform:"uppercase",backdropFilter:"blur(5px)"}}>
                <Container fluid>

                    <Navbar.Brand style={{color:"#cd5c5c",fontWeight:"bold"}} href="#/">ArcoLinux - Webshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#/">Home</Nav.Link>
                                <Nav.Link href="#/AboutPage">About us</Nav.Link>
                                <Nav.Link href="#/Webshop">Webshop</Nav.Link>
                                <NavDropdown
                                    title="Shopping Cart"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                >
                                    <NavDropdown.Item href="#action3">Open Cart</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            {auth.currentUser? <Button href="#/Profile" variant="dark">Profile</Button>:<Button href="#/Login" variant="dark">Login</Button>}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );
}

