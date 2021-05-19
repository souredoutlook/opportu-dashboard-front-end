import React, { useState } from 'react';
import ReactWordcloud from 'react-wordcloud';

import { parseValues, colors } from '../../helpers/rootValues';

import '../Dashboard.scss';



const callbacks = {
  // getWordColor: word => colors[-word.value], 
  getWordTooltip: word => `#${-word.value}`,
}




export default function RootValues(props) {
  
  const [toggleState, setToggleState] = useState(true);
  
  const { rootValues } = props;
  
  const words = parseValues(rootValues, true);
  
  const mql = window.matchMedia(
    '(max-width: 420px)'
  );
  
  const options = {
    colors,
    fontFamily: 'montserrat',
    rotations: 0,
    fontSizes: mql.matches ? [16, 30] : [20,50],
    scale: 'linear',
  };

  function handleClick() {
    setToggleState(!toggleState);
  };

  return (
    <article className="dashboard--card">
        <h3>Root Values</h3>
        {toggleState && 
        <div style={{ height: '100%', width: '100%' }}>
          <ReactWordcloud
            callbacks={callbacks}
            options={options}
            words={words}
          />
        </div>}
        {!toggleState && 
        <div className="dashboard--list">
            {parseValues(rootValues, false).map((element, index) => {
              return (
                <p>#{index+1} - {element}</p>
              )
            })}
        </div>} 
        <div className={`dashboard--toggle  ${toggleState ? 'left' : 'right'}`} onClick={handleClick} >
          <div className='dashboard--slider' />
        </div>
    </article>
  );
};