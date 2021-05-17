import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Draggable from './assessments/Draggable';
import DroppableList from './assessments/DroppableList';

import coreValues from '../helpers/coreValues'
import { parseParents, initialState } from '../helpers/assessments'

import './Assessments.scss';

export default function Assessments() {
  
  const [parent, setParent] = useState(initialState);

  const draggableList = coreValues.map((value, index) => {
    const id = `draggable${index}`;
    return (
      <Draggable id={id} key={id}>
        {value}
      </Draggable>
    );
  });
  
  function handleChange(event) {
    const { name, value } = event.target;
    setParent(prev => ({
      ...prev,
      [name]: {...prev[name], value},
    }));
  };

  function handleDragEnd(event) {
    const {over, active} = event;
    
    //handle when dragEnd happens outside of a droppable area or activeId is already dropped
    for (const value in parent) {
      if (parent[value].draggable && parent[value].draggable.key === active.id) {
        setParent(prev => ({...prev, [value]: {...prev[value], draggable: null}}));
      }
    }
    
    if (over && active) {
      setParent(prev => ({...prev, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
    }
  };
  
  const { id } = useParams();

  function submit() {

    axios
      .put(
        `/assessments/values/${id}`,
        {values: parseParents(parent)}
    )
    .then(response => {
      if (response.status === 200) {
        setParent(prev => ({...prev, error: false}))
      }
    })
    .catch(err => {
      setParent(prev => ({...prev, error: true}));
    });
  };

  return (
    <section className="assessment">
      <article className="assessment--card">
        <h3>Core Values Assessment id #{id}</h3>
        <div className="assessment--form">
          <DndContext onDragEnd={handleDragEnd} >
            <form className="assessment--form wrap droppable">
              <DroppableList 
                parent={parent}
                draggableList={draggableList}
                handleChange={handleChange}
              />
            </form>
            <form className="assessment--form row wrap">
              {draggableList.filter(element => {
                for (const value in parent) {
                  if (parent[value].draggable && parent[value].draggable.key === element.key) {
                    return null 
                  }
                }
                return element;
              })}
            </form>
          </DndContext>
        </div>
        <button type="submit" onClick={submit}>Submit Assessment</button>
        <div className="assessment--error">
          {parent.error && <p>Something went wrong...</p>}
        </div>
      </article>
    </section>
  );
};
