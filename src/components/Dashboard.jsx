import React from 'react';

export default function Dashboard(props) {

  const loc = JSON.stringify(props.location);

  return (
    <div className="container">
      <h3>Dashboard Page</h3>
      <p className="flow-text">{loc}</p>
    </div>
  );
};