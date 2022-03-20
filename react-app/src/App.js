import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import SpotsPage from './components/Spots/AllSpots/SpotsPage';
import SpotsDetailsPage from './components/Spots/SpotsDetailsPage/SpotsDetailsPage';
import Footer from './components/Footer';
import MySpots from './components/Profiles/MySpots/MySpots';
import ErrorPage from './components/Error';
import { authenticate } from './store/session';
import { getSpots } from './store/spot'
import { getReviews } from './store/review';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getSpots())
      await dispatch(getReviews())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/spots'>
          <SpotsPage />
        </Route>
        <Route path='/spots/:id'>
          <SpotsDetailsPage />
        </Route>
        <Route path='/profiles/:id' exact={true} >
          <MySpots />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
