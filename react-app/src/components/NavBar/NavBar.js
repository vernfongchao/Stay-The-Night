
import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import CreateSpotModal from '../Spots/CreateSpotModal';

import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className='navbar-container'>

      <div className='navbar-right-container'>

        {user && <CreateSpotModal />}
        <ProfileMenu />
      </div>

    </nav>
  );
}

export default NavBar;
