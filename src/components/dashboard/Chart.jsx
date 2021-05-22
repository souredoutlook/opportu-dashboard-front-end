import React from 'react';
import { HorizontalBarSeries, XAxis, XYPlot, YAxis } from "react-vis";

import { capitalize } from '../../helpers/dashboard';

// import '../../../node_modules/react-vis/dist/style.css';

export default function Chart(props) {

  const {facets} = props;

  const data = Object.keys(facets).map((facet, index) => {
    return {y: index, x: facets[facet], facet}
  });
  
  const mql = window.matchMedia(
    '(max-width: 480px)'
  );

  return (
    <XYPlot margin={{left: mql.matches ? 80 : 120}} height={300} width={mql.matches ? 280 : 360 } animation={true}>
      <XAxis tickTotal={10} tickFormat={v => parseInt(v) } />
      <YAxis
        tickFormat={v => capitalize(data[v] && data[v].facet)}
      />
      <HorizontalBarSeries
        data={data}
        color={'#E09D4B'}
      />
    </XYPlot>
  );
}
