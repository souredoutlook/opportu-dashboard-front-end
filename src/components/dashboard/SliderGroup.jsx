import React, { useState } from 'react';


import '../Dashboard.scss';

export default function SliderGroup(props) {
  
 const {facets, setFacets, id} = props;

  function capitalize(string) {
    return string.split('').map((value,index)=>index === 0 ? value.toUpperCase() : value).join('')
  };
  
  function handleChange(evt) {
    const value = Number(evt.target.value);
    setFacets((prev) => ({
      ...prev,
      [evt.target.name]: value,
    }));
  }

  return (
      <div className="dashboard--form--group">
        <div className="dashboard--form--group--item left">
          <label htmlFor={id}>{capitalize(id)}</label>
          <label htmlFor={id} >{facets[id]}</label>
        </div>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          name={id}
          id={id}
          value={facets[id]}
          onChange={handleChange}
          className='right'
        />
      </div>
  );
};