import React, { useState } from 'react';

import Individual from './AssignAssessment/Individual';
import Aggregate from './AssignAssessment/Aggregate'

import '../Admin.scss';

export default function AssignAssessment() {

  const [formData, setFormData] = useState({function: 0})

  const componentList = [<Individual />, <Aggregate />];

  function handleChange(evt) {
    const value = evt.target.value;

      setFormData((prev) => ({
        ...prev,
        [evt.target.name]: value,
      }));
  }

  return (
    <>
      <form className="admin--form">
        <div className="admin--form--group column">
          <label htmlFor="function" hidden={true}>Select an assessment type to assign:</label>
          <select
            name="function"
            id="function"
            onChange={handleChange}
            value={formData.function}
          >
            <option value={0}>Assign An Individual Assessment</option>
            <option value={1}>Assign An Aggregate Assessment</option>
          </select>
        </div>
      </form>
      {componentList[formData.function]}
    </>
  );
};