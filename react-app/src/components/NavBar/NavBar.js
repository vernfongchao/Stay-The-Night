
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import CreateSpotModal from '../Spots/CreateSpotModal';
import BecomeHostModal from '../Host/BecomeHostModal';

import './NavBar.css'


const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav className='navbar-container'>
      <div className='navbar-logo-container'>
        <Link to='/spots'>
          <img src="../../../static/Stay-The-Night-Logo.png" alt='STN Logo'>
          </img>
        </Link>
      </div>

      <div className='navbar-right-container'>

        {user && (user.host_id ? <CreateSpotModal /> : <BecomeHostModal />)}
        <ProfileMenu />
      </div>

    </nav>
  );
}

export default NavBar;
