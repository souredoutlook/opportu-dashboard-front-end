import React from 'react';

import './Navbar.scss';

export default function Navbar(props) {
  return (
    <section className='navbar'>
      <img 
        className='navbar--centered'
        src='images/opportu_retina.svg'
        alt='Opportu Logo'
      />
    </section>
  );
}