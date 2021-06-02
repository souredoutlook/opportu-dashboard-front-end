import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactWordcloud from 'react-wordcloud';

import { colors, formatValuesForWordCloud, formatDate } from '../../helpers/rootValues';

import '../Dashboard.scss';



const callbacks = {
  getWordColor: word => colors[-word.value], //comment this line out and import alternate colors from rootValues helper for random colors
  getWordTooltip: word => `#${-word.value}`,
}




export default function RootValues(props) {
  
  const [toggleState, setToggleState] = useState(true);
  
  const { rootValues, assessmentKey, list } = props;
  
  const words = formatValuesForWordCloud(rootValues[assessmentKey]);
  
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
        <div className="dashboard--card--header">
          <h3>{list ? formatDate(rootValues[assessmentKey]) : 'Root Values'}</h3>
          {list ? <Link to="/dashboard">(go back)</Link> : <Link to="/dashboard/rootvalues">(view all)</Link>}
        </div>
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
            {rootValues[assessmentKey].values.map((element, index) => {
              return (
                <p className={index <= 4 ? 'top' : 'bottom'} key={index}>#{index+1} - {element}</p>
              )
            })}
        </div>} 
        <div className={`dashboard--toggle  ${toggleState ? 'left' : 'right'}`} onClick={handleClick} >
          <div className='dashboard--slider' />
        </div>
    </article>
  );
};