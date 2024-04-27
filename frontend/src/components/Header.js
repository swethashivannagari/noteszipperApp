import React from 'react'
import './Header.css'
import { Button, Form, FormControl, Nav, NavDropdown, Navbar, Container } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/")
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container fluid>
        <Navbar.Brand >
          <Link to="/">
            Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className='m-auto'>
            <Form className="m-20">
              <Form.Control
                type="search"
                placeholder="Search"
                className="m-auto"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />

            </Form>
          </Nav>

          {userInfo ?( <Nav

            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link >
              <Link to="/mynotes">MyNotes</Link>
            </Nav.Link>

            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={logoutHandler
                }
              >
                LogOut
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>):(<Nav>
          <Nav.Link >
              <Link to="/login">Login</Link>
            </Nav.Link>
            </Nav>)}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header