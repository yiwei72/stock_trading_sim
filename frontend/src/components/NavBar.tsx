
import{Container, Nav,Navbar as NavbarBS} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { EmailContext } from "../Context";
import React, { useState, useContext } from "react";


export function Navbar(){
    
    let loginAuth = React.useContext(EmailContext);
    if (loginAuth.email === "") {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <NavbarBS className="bg-white shadow-sm mb-3">
        <Container>
            <Nav>
                
            </Nav>
            Stock Trading System
        </Container>
    </NavbarBS>
      }
      return <NavbarBS className="bg-white shadow-sm mb-3">
      <Container>
          <Nav className="me-auto">
              <Nav.Link to="/" as={NavLink} >Login</Nav.Link>
              <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
              <Nav.Link to="/" as={NavLink}>Login</Nav.Link>
          </Nav>
          hi
      </Container>
  </NavbarBS>
      
    
}
//<Nav.Link href="login" >
// Login
// </Nav.Link>