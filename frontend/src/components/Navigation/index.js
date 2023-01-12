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
      <div className='navigation'>
        <NavLink id='nav' to="/createSongs">Create Song</NavLink>
        <NavLink id='nav' to="/songs">All Songs</NavLink>
        <a id='nav' href="https://github.com/xickyy/issa-cloud-with-sound/tree/main" target="_blank">Visit my github</a>
        <a id='nav' href="https://www.linkedin.com/in/ricky-moore-b629b21ba/" target="_blank">Visit my Linked-in</a>
      </div>
      <div id='profileButton'>
        <ProfileButton id='nav' user={sessionUser} />
      </div>
      </>

    );
  } else {
    sessionLinks = (
      <div className='navigation'>
        <NavLink id='nav' to="/login">Log In</NavLink>
        <NavLink id='nav' to="/signup">Sign Up</NavLink>
        <NavLink id='nav' to="/songs">All Songs</NavLink>
        <a id='nav' href="https://github.com/xickyy/issa-cloud-with-sound/tree/main" target="_blank">Visit my github</a>
        <a id='nav' href="https://www.linkedin.com/in/ricky-moore-b629b21ba/" target="_blank">Visit my Linked-in</a>

      </div>
    );
  }

  return (
    <div>
      <ul>
        <li id='allLinks'>
          <div>
          <i className="fa-brands fa-soundcloud" />
          <NavLink id='nav' exact to="/">Home</NavLink>
          </div>
          <div id='mainLinks'>
          {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
