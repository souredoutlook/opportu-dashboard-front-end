import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';

import Draggable from './assessments/Draggable';
import DroppableList from './assessments/DroppableList';

import coreValues from '../helpers/coreValues'

import './Assessments.scss';

export default function Assessments() {
  
  const [parent, setParent] = useState(null);

  const draggableList = coreValues.map((value, index) => {
    const id = `draggable${index}`;
    return (
      <Draggable id={id} key={id}>
        {value}
      </Draggable>
    );
  });

  function handleDragEnd(event) {
    const {over, active} = event;
    if (over && active) {
      setParent(prev => ({...prev, [over.id]: draggableList.filter(element => element.key === active.id)[0]}));
    } else {
      //when dragEnd happens outside of a droppable area
      for (const value in parent) {
        if (parent[value] && parent[value].key === active.id) {
          setParent(prev => ({...prev, [value]: null}));
        }
      }
    }
  }

  let { id } = useParams();

  return (
    <section className="assessment">
      <article className="assessment--card">
        <h3>Core Values Assessment id #{id}</h3>
        <div className="assessment--form row">
          <DndContext onDragEnd={handleDragEnd} >
            <form className="assessment--form">
              <DroppableList 
                parent={parent}
                draggableList={draggableList}
              />
            </form>
            <form className="assessment--form row--wrap">
              {draggableList.filter(element => {
                for (const value in parent) {
                  if (parent[value] && parent[value].key === element.key) {
                    return null 
                  }
                }
                return element;
              })}
            </form>
          </DndContext>
        </div>
      </article>
    </section>
  );
};
