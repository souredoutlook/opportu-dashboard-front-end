import React from 'react';

export default function Welcome(props) {

  const loc = JSON.stringify(props.location);

  return (
    <div className="container">
      <h3>Welcome Page</h3>
      <p className="flow-text">{loc}</p>
    </div>
  );
};
