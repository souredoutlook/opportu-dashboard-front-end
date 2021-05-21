import React, { useState } from 'react';

import '../Dashboard.scss';

export default function Facet5(props) {
  
  const { facets } = props;

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
        {facets && 
          <div className='dashboard--error'>
            <p>It's working!</p>
          </div>
        }
        {facets && 
          <div className={`dashboard--toggle  ${toggleState ? 'left' : 'right'}`} onClick={handleClick} >
            <div className='dashboard--slider' />
          </div>
        }
    </article>
  );
};