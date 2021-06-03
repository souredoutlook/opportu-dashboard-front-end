import React, { useState } from 'react';
import axios from 'axios';

import './Settings.scss';

export default function Settings(props) {

  const { id } = props;
  
  const [formData, setFormData] = useState({error: false});

  const changePassword = ()=> {
    const { old_password, new_password } = formData;
    axios
      .put(
        `/users/${id}`,
      {old_password, new_password},
    )
    .then(response => {
      if (response.status === 200) {
        setFormData({error: false, message: 'Successfully updated password!'});
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

  function matchPasswords(event) {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: value,
    }));

    if (value !== formData.new_password) {
      setFormData(prev => ({...prev, message: 'New password fields do not match...'}));
    } else {
      setFormData(prev => ({...prev, message: null}));
    }
  };

  return (
    <section className="signin">
      <article className="signin--card">
        <h3>Change Password</h3>
        <form className="signin--form">
          <div className="signin--form--group">
            <label htmlFor="old_password">Old password</label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              value={formData.old_password || ''}
              onChange={handleChange}
            />
          </div>
          <div className="signin--form--group">
            <label htmlFor="new_password">New password</label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              value={formData.new_password || ''}
              onChange={handleChange}
            />
          </div>
          <div className="signin--form--group">
            <label htmlFor="match_password">Re-type new password</label>
            <input
              type="password"
              id="match_password"
              name="match_password"
              value={formData.match_password || ''}
              onChange={matchPasswords}
            />
          </div>
        </form>
        <button type="submit" onClick={changePassword}>Change Password</button>
        <div className="signin--error">
          {formData.error && !formData.message && <p>Something went wrong...</p>}
          {formData.message && <p>{formData.message}</p>}
        </div>
      </article>
    </section>
  );
};