import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

import './LoginForm.css'

const LoginForm = ({ setShowMenu }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  console.log(setShowMenu)


  useEffect(() => {

  }, [])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else { setShowMenu(false) }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
    else { setShowMenu(false) }
  };





  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-page-container'>
      <div className='login-form-header-container'>
        <h1 className='login-form-header-text'><i className="fa-solid fa-user"></i> LOGIN</h1>
      </div>
      <form className='login-form-container' onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-form-field-container'>

          <input className='login-form-email-field'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <input className='login-form-password-field'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>

        <div className='login-form-button-containers'>
          <button className='login-form-demo-button' type='button' onClick={onDemo}>Demo</button>
          <button className='login-form-demo-button'type='submit'>Login</button>
        </div>
      </form>

    </div>
  );
};

export default LoginForm;
