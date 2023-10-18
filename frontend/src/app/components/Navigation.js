'use client'

import { Container, Nav, Navbar, NavDropdown, SSRProvider } from 'react-bootstrap'

export default function MainMenu() {
  return <SSRProvider>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Color App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/palette">Color Palette</Nav.Link>
            <Nav.Link href="/recognition">Color Recognition</Nav.Link>
            <Nav.Link href="/simulator">Color Simulator</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </SSRProvider>
}