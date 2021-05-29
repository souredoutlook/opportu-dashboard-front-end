import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Draggable from './assessments/Draggable';
import DroppableList from './assessments/DroppableList';

import coreValues from '../helpers/coreValues'
import { parseParents, initialState, constants } from '../helpers/assessments'

import './Assessments.scss';

const { FORBIDDEN, COMPLETE, LOADING, INCOMPLETE, NOTFOUND } = constants;
export default function Assessments() {
  const [formState, setFormState] = useState(LOADING);
  const [parents, setParents] = useState(initialState);

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
    setParents(prev => ({
      ...prev,
      [name]: {...prev[name], value},
    }));
  };

  function shiftUp(droppableKeyIndex, upperBound, over, active) {
    const shiftedParents = {};
      for (let i = droppableKeyIndex; i < upperBound; i++) {
        shiftedParents[`droppable${i + 1}`] = {...parents[`droppable${i}`]}
      }
    setParents(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
  };

  function shiftDown(droppableKeyIndex, lowerBound, over, active) {
    const shiftedParents = {};
      for (let i = droppableKeyIndex; i > lowerBound; i--) {
        shiftedParents[`droppable${i - 1}`] = {...parents[`droppable${i}`]}
      }
    setParents(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
  };

  function handleDragEnd(event) {
    const {over, active} = event;
    if (over) {
      const formerDroppableKeyIndexOfActive = Object.entries(parents).filter(element => element[0] !== 'error').findIndex(element => element[1].draggable && element[1].draggable.key === active.id);

      if (parents[over.id].draggable === null) {
        //if dragEnd is over a Droppable component that has no Draggable child
        // and Draggable component was not a child
        if (formerDroppableKeyIndexOfActive <= -1) {
          setParents(prev => ({...prev, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
        } else {
          //and Draggable component was a child
          setParents(prev => ({...prev, [`droppable${formerDroppableKeyIndexOfActive}`]: {...prev[`droppable${formerDroppableKeyIndexOfActive}`], draggable: null}, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
        }
      } else {
        //if dragEnd is over a Droppable component that has a Draggable child
        const nullKeyIndex = Object.entries(parents).filter(element => element[0] !== 'error').findIndex(element => element[1].draggable === null && element[1].value === '');
        const droppableKeyIndex = Object.keys(parents).filter(element => element !== 'error').findIndex(element => element === over.id);

        if (nullKeyIndex === -1) {
          // if the DroppableList is full
          // and the Draggable component was not a child prior to dragEnd, shift all Draggable children down one position and pop the last one off
          if (formerDroppableKeyIndexOfActive <= -1) {
            shiftUp(droppableKeyIndex, 9, over, active);
          } else {
            // and the Draggable component was a child,
            if (droppableKeyIndex === formerDroppableKeyIndexOfActive) {
              setParents(prev => ({...prev, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            } else if (droppableKeyIndex < formerDroppableKeyIndexOfActive) {
              shiftUp(droppableKeyIndex, formerDroppableKeyIndexOfActive, over, active);
            } else {
              shiftDown(droppableKeyIndex, formerDroppableKeyIndexOfActive, over, active);
            }
          }
        } else {
          // if the DroppableList is not full
          // and the Draggable component was not a child prior to dragEnd, shift all Draggable children down one position and pop the last one off
          if (formerDroppableKeyIndexOfActive <= -1) {
            // and nullKey index is less than droppableKeyIndex
            if (nullKeyIndex < droppableKeyIndex) {
              shiftDown(droppableKeyIndex, nullKeyIndex, over, active);
            } else {
              // and nullKey index is great than droppableKeyIndex
              shiftUp(droppableKeyIndex, nullKeyIndex, over, active);
            }
          } else {
            // and the Draggable component was a child,
            if (droppableKeyIndex === formerDroppableKeyIndexOfActive) {
              setParents(prev => ({...prev, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            } else if (formerDroppableKeyIndexOfActive  < droppableKeyIndex) {
              shiftDown(droppableKeyIndex, formerDroppableKeyIndexOfActive, over, active);
            } else {
              // and formerDroppableKeyIndexOfActive  index is greater than droppableKeyIndex
              shiftUp(droppableKeyIndex, formerDroppableKeyIndexOfActive, over, active);
            }
          }
        }
      }
    } else {
      for (const value in parents) {
        //handle when dragEnd happens outside of a droppable area
        if (parents[value].draggable && parents[value].draggable.key === active.id) {
          setParents(prev => ({...prev, [value]: {...prev[value], draggable: null}}));
        }
      }
    }
  };
  
  const { id } = useParams();

  useEffect(()=>{
    axios.get(`/assessments/values/${id}`)
    .then((response)=>{
      if (response.status === 200) {
        setFormState(INCOMPLETE);
      }
    })
    .catch(err => {
      const {status} = err.response;
      if (status === 401) {
        setFormState(COMPLETE);
      } else if (status === 403) {
        setFormState(FORBIDDEN);
      } else if (status === 404) {
        setFormState(NOTFOUND);
      }
    })
  },[])

  function submit() {

    axios
      .put(
        `/assessments/values/${id}`,
        {values: parseParents(parents)}
    )
    .then(response => {
      if (response.status === 200) {
        setParents(prev => ({...prev, error: false}))
        setFormState(COMPLETE);
      }
    })
    .catch(err => {
      setParents(prev => ({...prev, error: true}));
    });
  };

  return (
    <section className="assessment">
      <article className="assessment--card">
        {formState === INCOMPLETE &&
          (<>
            <h3>Root Values Assessment</h3>
            <div className="assessment--form">
              <DndContext onDragEnd={handleDragEnd} >
                <form className="assessment--form wrap droppable">
                  <DroppableList 
                    parents={parents}
                    draggableList={draggableList}
                    handleChange={handleChange}
                  />
                </form>
                <form className="assessment--form row wrap">
                  {draggableList.filter(element => {
                    for (const value in parents) {
                      if (parents[value].draggable && parents[value].draggable.key === element.key) {
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
              {parents.error && <p>Something went wrong...</p>}
            </div>
          </>
          ) 
        }
        {formState === COMPLETE &&
          <>
            <h3>This assessment has been completed!</h3>
            <Link to='/dashboard'>
              <p>See the results in your Dashboard</p>
            </Link>
          </>
        }
        {formState === FORBIDDEN && <h3>This assessment does not belong to your account...</h3>}
        {formState === NOTFOUND && <h3>Assessment not found...</h3>}
      </article>
    </section>
  );
};
