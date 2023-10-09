import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
    return (
        <Navbar expand="lg" className="side-bar">
            <Container>
                <Navbar.Brand href="/home">Find My Roomie</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="/messages">Direct Messages</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile">Your Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;