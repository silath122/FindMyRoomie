import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./styling/Sidebar.css"
import {Typography} from "@mui/material"

function Sidebar() {
    return (
        <Navbar expand="lg" className="side-bar">
            <Container >
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav>
                        <Nav.Link href="/home" className="sidebar-buttons">
                            <Typography sx={{fontSize: '15px'}}>
                            Home
                            </Typography>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/messages" className="sidebar-buttons">
                            <Typography sx={{fontSize: '15px'}}>
                            Direct Messages
                            </Typography>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/matches" className="sidebar-buttons">
                            <Typography sx={{fontSize: '15px'}}>
                            Your Matches
                            </Typography>
                            </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile" className="sidebar-buttons">
                            <Typography sx={{fontSize: '15px'}}>
                                Your Profile </Typography>
                            </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Sidebar;