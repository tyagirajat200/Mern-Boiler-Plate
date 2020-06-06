import React, { useState } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../Actions/authentications'
import { useHistory } from 'react-router-dom'

const Navbar = () => {

  const [isOpen, setIsopen] = useState(false)


  const history = useHistory()

  const auth = useSelector((state) => {
    return state.auth.isAuthenticated;
  })

  const dispatch = useDispatch()

  const onLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser(history))
  }

  const toggleCollapse = () => {
    setIsopen(!isOpen);
  };

  return (

    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">Navbar</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBLink to="/">Home</MDBLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBLink to="/agenda">Features</MDBLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBLink to="/Postmessage">PostMessages</MDBLink>
          </MDBNavItem>
        </MDBNavbarNav>

        <MDBNavbarNav right>

          {
            !auth &&
            <React.Fragment>
              <MDBNavItem>
                <MDBLink to="/login" link>Login</MDBLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBLink to="/register">Rgister</MDBLink>
              </MDBNavItem>

            </React.Fragment>
          }

          {auth &&
            <MDBNavItem>
              <MDBLink to="/" onClick={onLogOut}>Logout</MDBLink>
            </MDBNavItem>
          }

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>

  );
}


export default (Navbar);