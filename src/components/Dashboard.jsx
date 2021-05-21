import React, { useState, useEffect } from 'react';
import RootValues from './dashboard/RootValues';
import Facet5 from './dashboard/Facet5';

import axios from 'axios';

import './Dashboard.scss';

export default function Dashboard(props) {

  const [dashData, setDashData] = useState({error: false});
  
  const { id } = props;

  useEffect(()=>{
    axios
      .get(
      `/users/${id}/assessments`
    )
    .then(response => {
      if (response.status === 200) {
        setDashData(prev => ({...prev, ...response.data}))
      }
    })
    .catch(err => {
      setDashData(prev => ({...prev, error: true}));
    });
  }, []);

  const rootValues = (dashData.assessments && dashData.assessments.core_values) || undefined;
  const facets = (dashData.assessments && dashData.assessments.facets) || undefined;
  return (
    <section className="dashboard">
      {rootValues && <RootValues rootValues={rootValues} />}
      <Facet5 facets={facets}/>
    </section>
  );
};