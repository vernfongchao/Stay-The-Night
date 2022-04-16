import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import LoginForm from '../LoginFormModal/LoginForm';

import './SignUpForm.css'

const SignUpForm = ({ setShowMenu }) => {
  const [errors, setErrors] = useState([]);
  const [first, setFirst] = useState('')
  const [maxFirst, setMaxFirst] = useState('')
  const [last, setLast] = useState('')
  const [maxLast, setMaxLast] = useState('')
  const [username, setUsername] = useState('');
  const [maxUsername, setMaxUsername] = useState('')
  const [email, setEmail] = useState('');
  const [maxEmail, setMaxEmail] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const [isSignup, setIsSignup] = useState(true)

  const dispatch = useDispatch();

  useEffect(() => {
    if (first.length >= 100) {
      setMaxFirst("Maximum Characters Reached")
    }
    if (first.length < 100) {
      setMaxFirst("")
    }
    if (last.length >= 100) {
      setMaxLast("Maximum Characters Reached")
    }
    if (last.length < 100) {
      setMaxLast("")
    }
    if (username.length >= 40) {
      setMaxUsername("Maximum Characters Reached")
    }
    if (username.length < 40) {
      setMaxUsername("")
    }
    if (email.length >= 50) {
      setMaxEmail("Maximum Characters Reached")
    }
    if (email.length < 50) {
      setMaxEmail("")
    }
  }, [first, last, username, email])





  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(first, last, username, email, password, repeatPassword));
    if (data) {
      setErrors(data)
      if (password !== repeatPassword) {
        setPassword("")
        setRepeatPassword("")
      }
    } else {
      if (setShowMenu) setShowMenu(false)
    }
  };
  const updateFirst = (e) => {
    setFirst(e.target.value);
  };

  const updateLast = (e) => {
    setLast(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (isSignup ?
    (<div className='sign-form-page-container'>
      <div className='login-form-header-container'>
        <i className="fa-solid fa-user"></i>
        <h1 className='login-form-header-text'> Sign Up</h1>
      </div>

      <form className='signup-form-container' onSubmit={onSignUp}>
        <div className='signup-form-error-container'>
          {errors.map((error, ind) => (
            <div className='signup-error-message' key={ind}>{error}</div>
          ))}
        </div>
        <div className='signup-form-field-container'>
          <div className='signup-form-field-input-container'>
            {maxFirst &&
              <p className='signup-error-message'>{maxFirst}</p>
            }
            <div className='signup-form-label-field'>
              <label>First Name</label>
              <input className='signup-form-field'
                type='text'
                name='first'
                onChange={updateFirst}
                value={first}
                maxLength="100"
                placeholder='First Name'
              ></input>

            </div>

          </div>

          <div className='signup-form-field-input-container'>
            {maxLast &&
              <p className='signup-error-message'>{maxLast}</p>
            }
            <div className='signup-form-label-field'>

              <label>Last Name</label>
              <input className='signup-form-field'
                type='text'
                name='last'
                onChange={updateLast}
                value={last}
                maxLength="100"
                placeholder='Last Name'
              ></input>
            </div>
          </div>

          <div className='signup-form-field-input-container'>
            {maxUsername &&
              <p className='signup-error-message'>{maxUsername}</p>
            }
            <div className='signup-form-label-field'>
              <label>Username</label>
              <input className='signup-form-field'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                maxLength="40"
                placeholder='Username'
              ></input>
            </div>
          </div>

          <div className='signup-form-field-input-container'>
            {maxEmail &&
              <p className='signup-error-message'>{maxEmail}</p>
            }
            <div className='signup-form-label-field'>
              <label>Email</label>
              <input className='signup-form-field'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                maxLength="50"
                placeholder='Email'
              ></input>
            </div>
          </div>

          <div className='signup-form-label-field'>
            <label>Password</label>
            <input className='signup-form-field'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            ></input>
          </div>

          <div className='signup-form-label-field'>
            <label className='signup-form-confirm-label'>Confirm Password</label>
            <input className='signup-form-field'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder="Confirm Password"
            ></input>
          </div>
        </div>
        <div className='login-form-button-containers'>
          <button className="signup-form-button" type='button'>Demo</button>
          <button className="signup-form-button" type='submit'>Sign Up</button>
        </div>
      </form>
      <div className='signup-form-to-login-container'>
        <span>
          Have an account? <span className='signup-form-to-login-text' onClick={() => setIsSignup(false)}>Login</span> here
        </span>
      </div>
    </div>) :
    (!isSignup && <LoginForm setShowMenu={setShowMenu} />)
  );
};

export default SignUpForm;
