import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Navbar.scss';

export default function Navbar(props) {
  const { userData, setUserData } = props;

  const signOut = ()=> {
    axios
      .delete('/sessions')
      .then(response => {
        if (response.status === 200) {
          setUserData({})
        }
      });
  }

  return (
    <nav className='navbar'>
      <Link to='/'>
        <img 
          className='navbar--centered'
          src='/images/opportu_retina.svg'
          alt='Opportu Logo'
        />
      </Link>
      <div className='navbar--centered'>
        <ul className='navbar--list'>
          {userData.is_admin && 
          <li className='heading'>
            <Link to='/admin'>
              Admin
            </Link>
          </li>}
          {userData.first_name && 
          <li className='heading'>
            <Link to='/dashboard'>
              Dashboard
            </Link>
          </li>}
          {userData.first_name && 
          <li className='heading'>
            <Link to='/settings'>
              Settings
            </Link>
          </li>}
          {userData.first_name && <li className='heading' onClick={signOut}>Sign Out</li>}
          {!userData.first_name &&
            <li className='heading'>
              <Link to='/signin'>
                Sign In
              </Link>
            </li>}
        </ul>
      </div>
    </nav>
  );
}