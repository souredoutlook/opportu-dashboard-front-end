import React from 'react';
import Droppable from './Droppable';

import '../Assessments.scss';

export default function DroppableList(props) {

  const { draggableList, parents, handleChange, setParents} = props;

  const droppableList = [...new Array(10)].map((value, index)=>{
    const id = `droppable${index}`;

    const placeholder = (
      <input
        placeholder={'Drop or type here'}
        name={id}
        value={parents[id].value}
        onChange={handleChange}
      />
    );

    const handleClick = function(event) {
      event.preventDefault();
      setParents(prev => ({...prev, [id]: {value:'', draggable: null}}));
    };

    return (
      <div className="assessment--form--group" key={id}>
        <label htmlFor={id}>#{index + 1}</label>
        <Droppable id={id}>
          {parents[id].draggable ? draggableList.filter(element => element.key === parents[id].draggable.key) : placeholder}
        </Droppable>
        <button className="clear" onClick={handleClick}>clear</button>
      </div>
    );
  });

    return (
      <>
        {droppableList}  
      </>
  );
}