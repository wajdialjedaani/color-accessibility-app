import { Container, Nav, Navbar, NavDropdown, SSRProvider } from 'react-bootstrap'

export default function MainMenu() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Color App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Color Palette</Nav.Link>
            <Nav.Link href="#link">Color Recognition</Nav.Link>
            <Nav.Link href="#link">Color Simulator</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}