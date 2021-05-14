import React, { useState } from 'react';
import axios from 'axios';

import './SignIn.scss';

export default function SignIn(props) {

 const { setUserData } = props;

 const [formData, setFormData] = useState({error: false});



  const signIn = ()=> {
    const { email, password } = formData;
    axios
      .post(
      '/sessions',
      { email, password},
    )
    .then(response => {
      if (response.status === 200) {
        setUserData({...response.data});
        setFormData({error: false});
      }
    })
    .catch(err => {
      setFormData({error: true}); 
    });
  };

  function handleChange(event) {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));
  }

  return (
    <section className="signin">
      <article className="signin--card">
        <h3>Log in to My Dashboard</h3>
        <form className="signin--form">
          <div className="signin--form--group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="signin--form--group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
            />
          </div>
        </form>
        <button type="submit" onClick={signIn}>Sign In</button>
        <div className="signin--error">
          {formData.error && <p>The username or password was incorrect, please try again</p>}
        </div>
      </article>
    </section>
  );
};