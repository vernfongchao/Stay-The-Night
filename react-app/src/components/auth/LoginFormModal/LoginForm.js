import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import SignUpForm from '../SignUpFormModal/SignUpForm';

import './LoginForm.css'

const LoginForm = ({ setShowMenu }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true)



  useEffect(() => {

  }, [])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else { setShowMenu && setShowMenu(false) }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
    else { setShowMenu && setShowMenu(false) }
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



  return (isLogin ?
    (<div className='login-form-page-container'>
      <div className='login-form-header-container'>
        <i className="fa-solid fa-user"></i>
        <h1 className='login-form-header-text'> LOGIN</h1>
      </div>
      <form className='login-form-container' onSubmit={onLogin}>
        <div className='login-form-error-container'>
          {errors.map((error, ind) => (
            <div className='login-error-message' key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-form-field-container'>

          <input className='login-form-field'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <input className='login-form-field'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>

        <div className='login-form-button-containers'>
          <button className='login-form-demo-button' type='button' onClick={onDemo}>Demo</button>
          <button className='login-form-demo-button' type='submit'>Login</button>
        </div>
      </form>
      <div className='login-form-to-signup-container'>
        <span>
          Don't have an account? <span className='login-form-to-signup-text' onClick={() => setIsLogin(false)}>Sign-Up</span> here
        </span>
      </div>
    </div>)
    : (!isLogin && <SignUpForm  setShowMenu={setShowMenu}/>)
  );
};

export default LoginForm;
