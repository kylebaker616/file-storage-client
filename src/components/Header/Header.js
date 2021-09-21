/* eslint-disable no-tabs */
import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

const authenticatedOptions = (
  <Fragment>
    <NavLink to='/change-password' className='nav-link'>
			Change Password
    </NavLink>
    <NavLink to='/sign-out' className='nav-link'>
			Sign Out
    </NavLink>
    <NavLink to='/upload' className='nav-link'>
			Upload
    </NavLink>
    <NavLink to='/uploads' className='nav-link'>
			My files
    </NavLink>
    <NavLink to='/add' className='nav-link'>
			Add friends
    </NavLink>
    <NavLink to='/requests' className='nav-link'>
			Requests
    </NavLink>
    <NavLink to='/friends' className='nav-link'>
			Friends
    </NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <NavLink exact to='/' className='nav-link'>Home</NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar class='navbar' bg='primary' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>File Storage</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        {user && (
          <span id='welcome-nav-bar' className='navbar-text mr-2'>Welcome, {user.username}</span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
