import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

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
      setShowMenu(false)
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

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <p>{maxFirst}</p>
        <label>First Name</label>
        <input
          type='text'
          name='username'
          onChange={updateFirst}
          value={first}
          maxLength="100"
        ></input>
      </div>
      <div>
        <p>{maxLast}</p>
        <label>Last Name</label>
        <input
          type='text'
          name='username'
          onChange={updateLast}
          value={last}
          maxLength="100"
        ></input>
      </div>
      <div>
        <p>{maxUsername}</p>
        <label>Username</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          maxLength="40"
        ></input>
      </div>
      <div>

        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          maxLength="50"
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
