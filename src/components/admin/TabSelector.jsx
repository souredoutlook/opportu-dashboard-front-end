import React, { useEffect } from 'react';

import CreateUser from './CreateUser';
import AssignAssessment from './AssignAssessment';

import './TabSelector.scss';

export default function TabSelector(props) {

  const { setActiveTab } = props;

  useEffect(()=>{
    setActiveTab(<CreateUser />)
  }, []);

  const onClick = (event)=> {
    const { id, parentNode } = event.target;

    //set sibling nodes to default style
    for (const child of parentNode.childNodes) {
      child.className = 'tabs--list--item';
    }

    //set clicked node to selected style
    event.target.className = 'tabs--list--item selected';

    switch (id) {
      case 'CreateUser':
        setActiveTab(<CreateUser />)
        break;
      case 'AssignUser':
        break;
      case 'AssignAssessment':
        setActiveTab(<AssignAssessment />)
        break;
      default: break;
    }


  }

  return (
    <nav className='tabs'>
      <ul className='tabs--list'>
        <li
          id='CreateUser'
          className='tabs--list--item selected'
          onClick={onClick}  
        >
          Create User
        </li>
        <li
          id='AssignUser'
          className='tabs--list--item'
          onClick={onClick}
        >
          Assign User
        </li>
        <li
          id='AssignAssessment'
          className='tabs--list--item'
          onClick={onClick}
        >
          Assign Assessment
        </li>
      </ul>
    </nav>
  );
};