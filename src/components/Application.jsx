import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Admin from './Admin';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import SignIn from './SignIn';
import Welcome from './Welcome';
import Assessments from './Assessments';

import './Application.scss';

export default function Application() {
  
  const [userData, setUserData] = useState({});

  const { first_name, id } = userData;

  return (
    <Router>
      <main className='layout'>
        <Navbar 
          userData={userData}
          setUserData={setUserData}
        />
        <Route exact path='/'>
          <Welcome />
        </Route>
        <Route path='/admin'>
          {first_name ? <Admin /> : <Redirect to='/signin' />}
        </Route>
        <Route path='/signin'>
          {first_name ? <Redirect to='/dashboard' /> : <SignIn setUserData={setUserData} /> }
        </Route>
        <Route path='/dashboard'>
          {first_name ? <Dashboard id={id}/> : <Redirect to='/signin' /> }
        </Route>
        <Route path='/assessments/:id'>
          {first_name ? <Assessments /> : <SignIn setUserData={setUserData} />}
        </Route>
      </main>
    </Router>
  );
}