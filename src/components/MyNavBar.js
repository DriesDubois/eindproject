import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import {useAuthValue} from '../contexts/AuthContext'
import {auth} from "../utils/firebase";
import {useCartContext} from "../contexts/cartContext";


export function MyNavBar() {
    const expand = "sm";
    const {cart} = useCartContext();
    const {removeCart} = useCartContext();

    return (
        <>
            <Navbar  variant="light" sticky="top" key={expand} expand={expand} className="pb-3" style={{fontFamily: "Iceberg",fontSize:"22px",fontWeight:"bold",fontTransform:"uppercase",backdropFilter:"blur(20px)"}}>
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
                                {/*<Nav.Link href="#/AboutPage">About us</Nav.Link>*/}
                                <Nav.Link href="#/Webshop">Webshop</Nav.Link>
                                <NavDropdown
                                    title="Shopping Cart"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                >
                                    <NavDropdown.Item disabled={!cart.length>0} href="#/Cart">{cart.length>0? "Open shopping cart": "Cart is empty"}</NavDropdown.Item>

                                    {cart.length>0&&<NavDropdown.Divider />}
                                    {cart.map(item => <NavDropdown.Item  href="#/Cart" className={"d-flex justify-content-between"}><p style={{width:"10ch",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{item.name}</p><p>{item.amount}</p><Button size="sm" variant="danger" onClick={(e) => {e.stopPropagation(); e.preventDefault(); removeCart(item)}}>X</Button></NavDropdown.Item>)}
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

