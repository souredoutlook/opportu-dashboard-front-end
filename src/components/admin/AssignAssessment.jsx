import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Admin.scss';

export default function AssignAssessment() {

  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({error: false});
  
  const nameList = userData.map((row, index) => {
    const string = `${row.first_name} ${row.last_name}${row.group_name ? ' - ' + row.group_name : ''}`;

    return(
      <option value={row.id} key={row.id}>
        {string}
      </option>
    )
  });
  
  useEffect(()=>{
    axios
      .get(
      '/users'
    )
    .then(response => {
      if (response.status === 200) {
        setUserData([...response.data]);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  const assignAssessment = () => {
    const { userId } = formData;
  
    axios
      .post(
      '/assessments/values',
      { userId },
    )
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
        setFormData({error: false});
      }
    })
    .catch(err => {
      console.log(err);
      setFormData({error: true}); 
    });
  };

  function handleChange(event) {
    const id = Number(event.target.value);

    setFormData((prev) => ({
      ...prev,
      userId: id,
    }));
  }

  return (
    <>
      <h3>Assign Assessment</h3>
      <form className="admin--form">
        <div className="admin--form--group column">
          <label htmlFor="name">Select a user to assign an assessment to: </label>
          <select
            name="name"
            id="name"
            onChange={handleChange}
          >
            <option value={0} selected>Select a user...</option>
            {nameList}
          </select>
        </div>
      </form>
      <button type="submit" onClick={assignAssessment}>Assign Assessment</button>
      <div className="admin--error">
        {formData.error && <p>Something went wrong...</p>}
      </div>
    </>
  );
};