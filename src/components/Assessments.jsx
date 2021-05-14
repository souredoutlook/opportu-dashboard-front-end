import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './Assessments.scss';

export default function Assessments(props) {

  // const [state, setState] = useState();

  let { id } = useParams();

  return (
    <section className="assessment">
      <article className="assessment--card">
        <p>I am an assessment</p>
        <p>{id}</p>
      </article>
    </section>
  );
};