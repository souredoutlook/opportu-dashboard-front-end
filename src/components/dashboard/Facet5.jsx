import React, { useState } from 'react';
import Notepad from './Notepad';
import Chart from './Chart';

import { capitalize } from '../../helpers/dashboard';

import '../Dashboard.scss';

export default function Facet5(props) {
  
  const { dashData, setDashData } = props;

  const facets  = (dashData.assessments && dashData.assessments.facets && dashData.assessments.facets.facets) || undefined;
  const id = (dashData.assessments && dashData.assessments.facets && dashData.assessments.facets.id) || undefined;

  const [toggleState, setToggleState] = useState(true);

  function handleClick() {
    setToggleState(!toggleState);
  };

  return (
    <article className="dashboard--card">
        <h3>Facet 5</h3>
        {!facets && 
          <div className='dashboard--error'>
            <p>It looks like you haven't taken the Facet 5 assessment...</p>
          </div>
        }
        {facets && !facets.affection && 
          <Notepad setDashData={setDashData} id={id}/>
        }
        {facets && facets.affection && toggleState &&
          <Chart facets={facets}/>
        }
        {facets && facets.affection && !toggleState &&
          <div className='dashboard--facets'>
            {Object.keys(facets).map((value, index) => {
              return(
                <p key={index}>{capitalize(value)} - {facets[value]}</p>
              );
            })}
            <a href={'https://www.facet5gps.com/'}>Maximize Facet 5 with Facet5 GPS</a>
          </div>
        }
        {facets && facets.affection && 
          <div className={`dashboard--toggle  ${toggleState ? 'left' : 'right'}`} onClick={handleClick} >
            <div className='dashboard--slider' />
          </div>
        }
    </article>
  );
};