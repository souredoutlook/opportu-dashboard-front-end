import React, { useState } from 'react';

import '../Dashboard.scss';

export default function Facet5(props) {
  
  const [toggleState, setToggleState] = useState(true);

  function handleClick() {
    setToggleState(!toggleState);
  };

  return (
    <article className="dashboard--card">
        <h3>Facet 5</h3>
        <div className={`dashboard--toggle  ${toggleState ? 'left' : 'right'}`} onClick={handleClick} >
          <div className='dashboard--slider' />
        </div>
    </article>
  );
};