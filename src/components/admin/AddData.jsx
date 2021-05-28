import React, { useState } from 'react';

import AddUser from './AddData/AddUser';
import AddTeam from './AddData/AddTeam';
import AddGroup from './AddData/AddGroup';

import '../Admin.scss';

export default function AddData() {

  const [formData, setFormData] = useState({function: 0})

  const componentList = [<AddUser />, <AddTeam />, <AddGroup />];

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
          <label htmlFor="function" hidden={true}>Select a data type to add:</label>
          <select
            name="function"
            id="function"
            onChange={handleChange}
            value={formData.function}
          >
            <option value={0}>Add User</option>
            <option value={1}>Add Team</option>
            <option value={2}>Add Group</option>
          </select>
        </div>
      </form>
      {componentList[formData.function]}
    </>
  );
};