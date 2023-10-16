import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./styling/Sidebar.css"
function Sidebar() {
    return (
        <Navbar expand="lg" className="side-bar">
            <Container>


                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/DM">Direct Messages</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/matches">Your Matches</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile">Your Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Sidebar;