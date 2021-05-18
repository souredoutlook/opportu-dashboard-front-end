import React from 'react';
import ReactWordcloud from 'react-wordcloud';

import { parseValues } from '../../helpers/rootValues';

import '../Dashboard.scss';


const words = [
  {
    text: 'told',
    value: -1,
  },
  {
    text: 'mistake',
    value: -2,
  },
  {
    text: 'thought',
    value: -3,
  },
  {
    text: 'bad',
    value: -4,
  },
];

const callbacks = {
  getWordColor: word => word.value > 50 ? "blue" : "red",
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: word => null,
}

const options = {
  rotations: 0,
  rotationAngles: [-90, 0],
};

const size = [200, 100];

export default function RootValues(props) {
  
  const { core_values } = props;

  return (
      <article className="dashboard--card">
        <h3>Root Values</h3>
        <ReactWordcloud
          callbacks={callbacks}
          options={options}
          size={size}
          words={words}
        />
      </article>
  );
};