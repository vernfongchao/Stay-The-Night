import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({setShowMenu}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setShowMenu(false)
  };

  return <button className='logout-button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
