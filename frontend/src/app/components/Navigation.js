"use client";

import { usePathname } from "next/navigation";
import { Container, Nav, Navbar, SSRProvider } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function MainMenu() {
  const pathname = usePathname();
  let dropdownTitle = "Color Palette";
  
  if (pathname === "/pages/imagePalette") {
    dropdownTitle = "Palette from Image";
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Color App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className={"/" === pathname ? "active fw-bold" : ""}
            >
              Home
            </Nav.Link>
            <NavDropdown
              id="palette-dropdown"
              title={dropdownTitle}
              className={
                pathname === "/pages/palette" || pathname === "/pages/imagePalette"
                  ? "active fw-bold"
                  : ""
              }
            >
              <NavDropdown.Item href="/pages/palette">
                Color Palette
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/imagePalette">
                Palette from Image
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/pages/recognition"
              className={
                "/pages/recognition" === pathname ? "active fw-bold" : ""
              }
            >
              Color Recognition
            </Nav.Link>
            <Nav.Link
              href="/pages/simulator"
              className={
                "/pages/simulator" === pathname ? "active fw-bold" : ""
              }
            >
              Color Simulator
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
