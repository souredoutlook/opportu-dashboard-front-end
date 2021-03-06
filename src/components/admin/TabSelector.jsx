import React, { useEffect } from 'react';

import AddData from './AddData';
import AssignAssessment from './AssignAssessment';
import AssignUser from './AssignUser';

import './TabSelector.scss';

export default function TabSelector(props) {

  const { setActiveTab } = props;

  useEffect(()=>{
    setActiveTab(<AddData />)
  },[])

  const onClick = (event)=> {
    const { id, parentNode } = event.target;

    //set sibling nodes to default style
    for (const child of parentNode.childNodes) {
      child.className = 'tabs--list--item';
    }

    //set clicked node to selected style
    event.target.className = 'tabs--list--item selected';

    switch (id) {
      case 'AddData':
        setActiveTab(<AddData />)
        break;
      case 'AssignUser':
        setActiveTab(<AssignUser />)
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
          id='AddData'
          className='tabs--list--item selected'
          onClick={onClick}  
        >
          Add Data
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