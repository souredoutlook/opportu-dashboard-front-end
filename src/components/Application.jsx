import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Admin from './Admin';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import SignIn from './SignIn';
import Welcome from './Welcome';
import Assessments from './Assessments';
import Settings from './Settings';

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
        <Route exact path='/admin'>
          {first_name ? <Admin /> : <Redirect to='/signin' />}
        </Route>
        <Route exact path='/signin'>
          {first_name ? <Redirect to='/dashboard' /> : <SignIn setUserData={setUserData} /> }
        </Route>
        <Route exact path='/dashboard'>
          {first_name ? <Dashboard id={id}/> : <Redirect to='/signin' /> }
        </Route>
        <Route exact path='/dashboard/rootvalues'>
          {first_name ? <Dashboard id={id} historicalRootValues={true}/> : <Redirect to='/signin' /> }
        </Route>
        <Route path='/assessments/:id'>
          {first_name ? <Assessments /> : <SignIn setUserData={setUserData} assessments={true}/>}
        </Route>
        <Route exact path='/settings'>
          {first_name ? <Settings id={id}/> : <SignIn setUserData={setUserData} />}
        </Route>
        <Route exact path='/'>
          <Welcome />
        </Route>
      </main>
    </Router>
  );
}