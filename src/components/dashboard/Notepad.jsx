import React, { useState } from 'react';
import axios from 'axios';

import SliderGroup from './SliderGroup';

import '../Dashboard.scss';

export default function Notepad(props) {

  const { setDashData, id } = props;
  
  const [facets, setFacets] = useState({will: 5, energy: 5, control: 5, emotionality: 5, affection: 5});

  const SliderGroupList = Object.keys(facets).map((facet, index) => {
    return (
      <SliderGroup
        facets={facets}
        setFacets={setFacets}
        id={facet}
        key={index}
      />
    );
  });

  const submit = (event)=> {
    console.log(event);
    event.preventDefault();

    axios
      .put(
      `/assessments/facets/${id}`,
      { facets },
    )
    .then(response => {
      if (response.status === 200) {
        setDashData(prev => ({...prev, assessments: {...prev.assessments, facets: {...prev.assessments.facets, facets}}}));
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      <form className="dashboard--form">
      <p>Enter your Facet 5 results below:</p>
        {SliderGroupList}
        <button onClick={submit}>Submit</button>
      </form>
    </>
  );
};