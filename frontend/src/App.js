import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongForm from "./components/SongForm";
import SongShow from "./components/SongShow";
import ShowOneSong from "./components/ShowOneSong";
import { getSongs } from "./store/songs";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route exact path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/createSongs">
            <SongForm />
          </Route>

          <Route exact path='/songs'>
            <SongShow />
          </Route>

          <Route exact path='/songs/:songId'>
            <ShowOneSong />
          </Route>

          <Route exact path='/songs/:songId/edit'>
            <SongForm songs={getSongs()}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
