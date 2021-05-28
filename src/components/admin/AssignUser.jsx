import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Admin.scss';

export default function AssignUser() {
  const [formData, setFormData] = useState({userId: 0, teamId: 0, error: false, message: null});

  const [teamsData, setTeamsData] = useState([]);
  
  const getTeamsData = function(setTeamsData) {
    return axios
    .get(
      '/teams'
      )
      .then(response => {
          setTeamsData([...response.data]);
      }) 
      .catch(err => {
        setFormData(prev => ({...prev, error: true}));
      });
    };

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
        setFormData(prev => ({...prev, error: true}));
      });
    };
    
    //load userData on first render
    useEffect(()=>{
      getUserData(setUserData);
      getTeamsData(setTeamsData);
    },[])

  
  const userList = userData.filter(row => row.id !== null && row.team_id === null).map(row => {
    const string = `${row.email} - ${row.first_name} ${row.last_name}`;
    
    return(
      <option value={row.id} key={row.id}>
        {string}
      </option>
    )
  });

  const teamList = teamsData.filter(row => row.team_id !== null).map(row => {
    const string = `${row.team_name} - ${row.group_name}`;
    
    return(
      <option value={row.team_id} key={row.team_id}>
        {string}
      </option>
    )
  });

  const assignUser = () => {
    const { userId, teamId } = formData;
  
    axios
      .post(
      '/assignments',
      { userId, teamId },
    )
    .then(response => {
      if (response.status === 200) {
        setFormData({userId: 0, teamId: 0, error: false, message: "Successfully assigned user to team!"});
      }
    })
    .catch(err => {
      setFormData({error: true}); 
    });
  };

  function handleChange(event) {
    const id = Number(event.target.value);

    setFormData((prev) => ({
      ...prev,
      [event.target.name]: id,
      message: null,
    }));
  }

  return (
    <>
      <h3>Assign User</h3>
      <form className="admin--form">
        <div className="admin--form--group column">
          <label htmlFor="userId">Select the user to assign: </label>
          <select
            name="userId"
            id="userId"
            onChange={handleChange}
            value={formData.userId}
          >
            <option value={0}>Select a user...</option>
            {userList}
          </select>
        </div>
        <div className="admin--form--group column">
          <label htmlFor="teamId">Select the team for assignment: </label>
          <select
            name="teamId"
            id="teamId"
            onChange={handleChange}
            value={formData.teamId}
          >
            <option value={0}>Select a team...</option>
            {teamList}
          </select>
        </div>
      </form>
      <button type="submit" onClick={assignUser}>Assign To Team</button>
      <div className="admin--error">
        {formData.error && <p>Something went wrong...</p>}
        {formData.message && <p>{formData.message}</p>}
      </div>
    </>
  );
};