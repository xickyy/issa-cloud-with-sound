import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className='navigation' to="/createSongs">Create Song</NavLink>
        <NavLink className='navigation' to="/songs">All Songs</NavLink>
        <ProfileButton user={sessionUser} />
      </>

    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='navigation' to="/login">Log In</NavLink>
        <NavLink className='navigation' to="/signup">Sign Up</NavLink>
        <NavLink className='navigation' to="/songs">All Songs</NavLink>

      </>
    );
  }

  return (
    <div className='navigation'>
      <ul id='nav'>
        <li>
          <i className="fa-brands fa-soundcloud" />
          <NavLink className='navigation' exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
