
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import CreateSpotModal from '../Spots/CreateSpotModal';

import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className='navbar-container'>
      <div>
        <img src="../../images/Stay-The-Night-Logo.png">
          <Link to='/spots'>
          </Link>
        </img>
      </div>

      <div className='navbar-right-container'>

        {user && <CreateSpotModal />}
        <ProfileMenu />
      </div>

    </nav>
  );
}

export default NavBar;
