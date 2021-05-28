import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../Admin.scss';

export default function AddTeam() {

  const [userData, setUserData] = useState([]);
  
  const getUserData = function(setUserData) {
    return axios
    .get(
      '/users'
    )
    .then(response => {
        setUserData([...response.data]);
    })
    .catch(err => {
      // setFormData(prev => ({...prev, error: true}));
    });
  };
    
  //load userData on first render
  useEffect(()=>{
    getUserData(setUserData);
  },[])

  const groupList = userData.filter(row => row.group_id !== null).map(row => {
    const string = `${row.group_name}`;
    
    return(
      <option value={row.group_id} key={row.group_id}>
        {string}
      </option>
    )
  });

  const [formData, setFormData] = useState({error: false, message: '', name: '', description: '', group_id: 0});

  const createTeam =  ()=> {
    const { name, description, group_id } = formData;
    axios
      .post(
      '/teams',
      { name, description, group_id },
    )
    .then(response => {
      if (response.status === 200) {
        setFormData({error: false, message: `Successfully created new team: ${name}!`});
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
      message: '',
    }));
  }

  return (
    <>
      <h3>Add Team</h3>
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
        <div className="admin--form--group column">
          <label htmlFor="group_id">Select a group to assign the new team to: </label>
          <select
            name="group_id"
            id="group_id"
            onChange={handleChange}
            value={formData.group_id}
          >
            <option value={0}>Select a group...</option>
            {groupList}
          </select>
        </div>
      </form>
      <button type="submit" onClick={createTeam}>Create</button>
      <div className="admin--error">
        {formData.error && <p>Something went wrong...</p>}
        {!formData.error && <p>{formData.message}</p>}
      </div>
    </>
  );
};