
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
      <div className='navbar-logo-container'>
        <Link to='/spots'>
          <img src="https://i.gyazo.com/7c928c3c9be068df01bc54a6fdd1b6e8.png">
          </img>
        </Link>
      </div>

      <div className='navbar-right-container'>

        {user && <CreateSpotModal />}
        <ProfileMenu />
      </div>

    </nav>
  );
}

export default NavBar;
