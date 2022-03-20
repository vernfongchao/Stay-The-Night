import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = ({ setShowMenu }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await dispatch(logout());
    setShowMenu(false)
    history.push('/')
  };

  return <button className='logout-button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
