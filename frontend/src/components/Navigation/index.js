import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      < >
      <NavLink to="/createSongs">Create Song</NavLink>
      <NavLink to="/songs">All Songs</NavLink>
      <ProfileButton user={sessionUser} />
      </>

    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/songs">All Songs</NavLink>

      </>
    );
  }

  return (
    <ul>
      <li>
      <i className="fa-brands fa-soundcloud" />
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
