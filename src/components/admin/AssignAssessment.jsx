import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Admin.scss';

export default function AssignAssessment() {
  const [formData, setFormData] = useState({userId: 0, assessment: 'values', error: false, message: null});

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
    },[])

  
  const nameList = userData.filter(row => row.id !== null).map(row => {
    const string = `${row.email} - ${row.first_name} ${row.last_name}${row.team_name ? ' - ' + row.team_name : ''}${row.group_name ? ' - ' + row.group_name : ''}`;
    
    return(
      <option value={row.id} key={row.id}>
        {string}
      </option>
    )
  });

  const assignAssessment = () => {
    const { userId } = formData;
  
    axios
      .post(
      `/assessments/${formData.assessment}`,
      { userId },
    )
    .then(response => {
      if (response.status === 200) {
        setFormData({userId: 0, assessment: 'values', error: false, message: `${formData.assessment === 'values' ? 'Root Values' : 'Facet 5'} assessment was successfully assigned!`});
      }
    })
    .catch(err => {
      setFormData(prev => ({...prev, error: true})); 
    });
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || value,
      message: null,
    }));
  }

  return (
    <>
      <h3>Assign Assessment</h3>
      <form className="admin--form">
      <div className="admin--form--group column">
          <label htmlFor="assessment">Select a user to assign an assessment to: </label>
          <select
            name="assessment"
            id="assessment"
            onChange={handleChange}
            value={formData.assessment}
          >
            <option value={'values'}>Root Values</option>
            <option value={'facets'}>Facet 5</option>
          </select>
        </div>
        <div className="admin--form--group column">
          <label htmlFor="userId">Select a user to assign an assessment to: </label>
          <select
            name="userId"
            id="userId"
            onChange={handleChange}
            value={formData.userId}
          >
            <option value={0}>Select a user...</option>
            {nameList}
          </select>
        </div>
      </form>
      <button type="submit" onClick={assignAssessment}>Assign Assessment</button>
      <div className="admin--error">
        {formData.error && <p>Something went wrong...</p>}
        {formData.message && <p>{formData.message}</p>}

      </div>
    </>
  );
};