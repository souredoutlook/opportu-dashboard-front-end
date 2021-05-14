import React, { useState } from 'react';
import axios from 'axios';

import { generatePassword } from '../../helpers/admin';

import '../Admin.scss';

export default function CreateUser() {

  const [formData, setFormData] = useState({error: false});

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
        console.log("email: ", email);
        console.log("password: ", password);
        setFormData({error: false});
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
    }));
  }

  return (
    <>
      <h3>Create User</h3>
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
        {formData.error && <p>The username or password was incorrect, please try again</p>}
      </div>
    </>
  );
};