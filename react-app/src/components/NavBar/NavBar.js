
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
      </ul>
    </nav>
  );
}

export default NavBar;
