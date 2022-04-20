import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import MyFavorites from './components/Profiles/MyFavorites/MyFavorites';
import { authenticate } from './store/session';
import { getSpots } from './store/spot'
import { getReviews } from './store/review';
import { getUsers } from './store/user';
import { getUserBookings } from './store/booking';
import { getUserFavorites } from './store/favorite';

import { AnimatePresence } from 'framer-motion/dist/framer-motion'



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const location = useLocation()

  useEffect(() => {
    (async () => {
      if (user) {
        await dispatch(getUserBookings(user?.id))
        await dispatch(getUserFavorites(user?.id))
      }
    })();
  }, [dispatch, user])

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getSpots())
      await dispatch(getReviews())
      await dispatch(getUsers())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar />
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/spots'>
            <SpotsPage />
          </Route>
          <Route path='/spots/:id'>
            <SpotsDetailsPage />
          </Route>
          <Route exact path='/profiles/:id' >
            <ProfileNavigation />
            <MyProfile />
          </Route>
          <Route exact path='/profiles/:id/spots'>
            <ProfileNavigation />
            <MySpots />
          </Route>
          <Route exact path='/profiles/:id/bookings'>
            <ProfileNavigation />
            <MyBookings />
          </Route>
          <Route exact path='/profiles/:id/favorites'>
            <ProfileNavigation />
            <MyFavorites />
          </Route>
          <Route path='/403-Unauthorized' >
            <ErrorPage403 />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
