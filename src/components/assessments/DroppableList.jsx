import React from 'react';
import Droppable from './Droppable';

import '../Assessments.scss';

export default function DroppableList(props) {

  const { draggableList, parent, handleChange} = props;

  const droppableList = [...new Array(10)].map((value, index)=>{
    const id = `droppable${index}`;

    const placeholder = (
      <input
        placeholder={'Drop or type here'}
        name={id}
        value={parent[id].value}
        onChange={handleChange}
      />
    );

    return (
      <div className="assessment--form--group" key={id}>
        <label htmlFor={id}>#{index + 1}</label>
        <Droppable id={id}>
          {parent[id].draggable ? draggableList.filter(element => element.key === parent[id].draggable.key) : placeholder}
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