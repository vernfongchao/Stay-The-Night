import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import SpotsPage from './components/Spots/AllSpots/SpotsPage';
import SpotsDetailsPage from './components/Spots/SpotsDetailsPage/SpotsDetailsPage';
import Footer from './components/Footer';
import MySpots from './components/Profiles/MySpots/MySpots';
import ErrorPage from './components/Error';
import ErrorPage403 from './components/Error/403';
import ProfileNavigation from './components/Profiles/NavBar';
import MyBookings from './components/Profiles/MyBookings/MyBookings';
import MyProfile from './components/Profiles/MyProfile/MyProfile';
import { authenticate } from './store/session';
import { getSpots } from './store/spot'
import { getReviews } from './store/review';
import { getUsers } from './store/user';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getSpots())
      await dispatch(getReviews())
      // await dispatch(getUsers())
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
          <ProfileNavigation />
          <MyProfile />
        </Route>
        <Route path='/profiles/:id/spots'>
          <ProfileNavigation />
          <MySpots />
        </Route>
        <Route path='/profiles/:id/bookings'>
          <ProfileNavigation />
          <MyBookings/>
        </Route>
        <Route path='/profiles/:id/favorites'>
          <ProfileNavigation />
        </Route>
        <Route path='/403-Unauthorized' >
          <ErrorPage403 />
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
