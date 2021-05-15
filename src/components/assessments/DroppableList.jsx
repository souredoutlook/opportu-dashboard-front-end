import React from 'react';
import Droppable from './Droppable';

import '../Assessments.scss';

export default function DroppableList(props) {

  const { draggableList, parent} = props;

  const droppableList = [...new Array(10)].map((value, index)=>{
    const id = `droppable${index}`;

    return (
      <div className="assessment--form--group">
        <label htmlFor={id}>#{index + 1}</label>
        <Droppable id={id}>
          {parent && parent[id] ? draggableList.filter(element => element.key === parent[id].key) : 'Drop here'}
        </Droppable>
      </div>
    );
  });

    return (
      <>
        {droppableList}  
      </>
  );
}