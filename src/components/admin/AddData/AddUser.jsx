import React, { useState } from 'react';
import axios from 'axios';

import { generatePassword } from '../../../helpers/admin';

import '../../Admin.scss';

export default function AddUser() {

  const [formData, setFormData] = useState({error: false, message: null});

  const createUser =  ()=> {
    const { first_name, last_name, email } = formData;
    const password = generatePassword();
    axios
      .post(
      '/users',
      { first_name, last_name, email, password },
    )
    .then(response => {
      if (response.status === 200) {
        setFormData({error: false, message: `Successfully created new user: ${first_name} ${last_name}!`});
      }
    })
    .catch(err => {
      setFormData({error: true}); 
    });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: value,
      message: null,
    }));
  }

  return (
    <>
      <h3>Add User</h3>
      <form className="admin--form">
        <div className="admin--form--group">
          <label htmlFor="first_name">first name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="admin--form--group">
          <label htmlFor="last_name">last name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="admin--form--group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </div>
      </form>
      <button type="submit" onClick={createUser}>Create</button>
      <div className="admin--error">
        {formData.error && <p>Something went wrong...</p>}
        {formData.message && <p>{formData.message}</p>}
      </div>
    </>
  );
};