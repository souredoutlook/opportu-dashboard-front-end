import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../Admin.scss';

export default function Aggregate() {
  const [formData, setFormData] = useState({classificationId: 0, classification: 'groups', error: false, message: null});

  const [classificationData, setClassificationData] = useState([]);
  
  const getClassificationData = function(setUserData, classification) {
    return axios
    .get(
      `${classification}`
      )
      .then(response => {
        console.log(response.data)
          setUserData([...response.data]);
      })
      .catch(err => {
        setFormData(prev => ({...prev, error: true}));
      });
    };

    useEffect(()=>{
      getClassificationData(setClassificationData, formData.classification);
    },[formData.classification])

  
  const nameList = classificationData.map((row, index) => {
    const { team_name, team_id, group_name, group_id } = row;
    let string = '';

    if (team_name) {
      string += `${team_name} - `
    }

    string += `${group_name}`
    
    return(
      <option value={team_id || group_id} key={index}>
        {string}
      </option>
    )
  });

  const assignAssessments = () => {
    const { classificationId, classification } = formData;
    const request = classification === 'teams' ? { groupId: null, teamId: classificationId } : { groupId: classificationId, teamId: null};
  
    axios
      .post(
      `/${classification}/values`,
      request,
    )
    .then(response => {
      if (response.status === 200) {
        setFormData(prev => ({...prev, classificationId: 0, error: false, message: 'Aggregate assessments were successfully created.'}));
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
          <label htmlFor="assessment">Select a classification: </label>
          <select
            name="classification"
            id="classification"
            onChange={handleChange}
            value={formData.classification}
          >
            <option value={'groups'}>Groups</option>
            <option value={'teams'}>Teams</option>
          </select>
        </div>
        <div className="admin--form--group column">
          <label htmlFor="userId">Assign aggregate Root Values to: </label>
          <select
            name="classificationId"
            id="classificationId"
            onChange={handleChange}
            value={formData.classificationId}
          >
            <option value={0}>Select a group or team</option>
            {nameList}
          </select>
        </div>
      </form>
      <button type="submit" onClick={assignAssessments}>Assign Assessments</button>
      <div className="admin--error">
        {formData.error && <p>Something went wrong...</p>}
        {formData.message && <p>{formData.message}</p>}

      </div>
    </>
  );
};