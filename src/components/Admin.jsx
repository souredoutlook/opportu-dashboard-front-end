import React from 'react';

export default function Admin(props) {

  const loc = JSON.stringify(props.location);

  return (
    <div className="container">
      <h3>Admin Page</h3>
      <p className="flow-text">{loc}</p>
    </div>
  );
};