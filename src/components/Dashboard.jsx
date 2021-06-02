import React, { useState, useEffect } from 'react';
import RootValues from './dashboard/RootValues';
import RootValuesList from './dashboard/RootValuesList';
import Facet5 from './dashboard/Facet5';

import axios from 'axios';

import { sortKeysByDate, formatValuesForWordCloud } from '../helpers/rootValues';
import './Dashboard.scss';

export default function Dashboard(props) {

  const [dashData, setDashData] = useState({error: false});
  
  const { id, historicalRootValues } = props;

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
  
  return (
    <section className="dashboard">
      {!historicalRootValues && 
        <>
          {rootValues && <RootValues rootValues={rootValues} assessmentKey={sortKeysByDate(rootValues)[0]} />}
          <Facet5 dashData={dashData} setDashData={setDashData} />
        </>
      }
      {historicalRootValues && 
        rootValues && <RootValuesList rootValues={rootValues} keyList={sortKeysByDate(rootValues)}/>
      }
    </section>
  );
};