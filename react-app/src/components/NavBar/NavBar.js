
import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import CreateSpotModal from '../Spots/CreateSpotModal';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        {user && <CreateSpotModal />}
        <ProfileMenu />
        {/* <li>
          <NavLink to='/profile/:id'>

          </NavLink>
        </li>


        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
