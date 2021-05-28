import React, { useState } from 'react';
import axios from 'axios';

import '../../Admin.scss';

export default function AddGroup() {

  const [formData, setFormData] = useState({error: false, message: null, name: '', description: ''});

  const createGroup =  ()=> {
    const { name, description } = formData;
    axios
      .post(
      '/groups',
      { name, description },
    )
    .then(response => {
      if (response.status === 200) {
        setFormData({error: false, message: `Successfully created new group: ${name}!`});
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
      <h3>Add Group</h3>
      <form className="admin--form">
        <div className="admin--form--group">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="admin--form--group">
          <label htmlFor="last_name">description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
      </form>
      <button type="submit" onClick={createGroup}>Create</button>
      <div className="admin--error">
        {formData.error && <p>Something went wrong...</p>}
        {formData.message && <p>{formData.message}</p>}
      </div>
    </>
  );
};