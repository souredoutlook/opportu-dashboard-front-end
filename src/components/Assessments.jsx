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
    if (over) {
      if (parent[over.id].draggable === null) {
        //if dragEnd is over a Droppable component that has no Draggable child
        setParent(prev => ({...prev, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
      } else {
        //if dragEnd is over a Droppable component that has a Draggable child
        const nullKeyIndex = Object.entries(parent).filter(element => element[0] !== 'error').findIndex(element => element[1].draggable === null && element[1].value === '');
        const droppableKeyIndex = Object.keys(parent).filter(element => element !== 'error').findIndex(element => element === over.id);
        const formerDroppableKeyIndexOfActive = Object.entries(parent).filter(element => element[0] !== 'error').findIndex(element => element[1].draggable && element[1].draggable.key === active.id)

        if (nullKeyIndex === -1) {
          // if the DroppableList is full
          // and the Draggable component was not a child prior to dragEnd, shift all Draggable children down one position and pop the last one off
          if (formerDroppableKeyIndexOfActive <= -1) {
            const shiftedParents = {};
            for (let i = droppableKeyIndex; i < 9; i++) {
              shiftedParents[`droppable${i + 1}`] = {...parent[`droppable${i}`]}
            }
            setParent(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
          } else {
            // and the Draggable component was a child,
            if (droppableKeyIndex === formerDroppableKeyIndexOfActive) {
              setParent(prev => ({...prev, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            } else if (droppableKeyIndex < formerDroppableKeyIndexOfActive) {
              const shiftedParents = {};
              for (let i = droppableKeyIndex; i < formerDroppableKeyIndexOfActive; i++) {
                shiftedParents[`droppable${i + 1}`] = {...parent[`droppable${i}`]}
              }
              setParent(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            } else {
              const shiftedParents = {};
              for (let i = droppableKeyIndex; i > formerDroppableKeyIndexOfActive; i--) {
                shiftedParents[`droppable${i - 1}`] = {...parent[`droppable${i}`]}
              }
              setParent(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            }
          }
        } else {
          // if the DroppableList is not full
          // and the Draggable component was not a child prior to dragEnd, shift all Draggable children down one position and pop the last one off
          if (formerDroppableKeyIndexOfActive <= -1) {
            // and nullKey index is less than droppableKeyIndex
            if (nullKeyIndex < droppableKeyIndex) {
              const shiftedParents = {};
              for (let i = droppableKeyIndex; i > nullKeyIndex; i--) {
                shiftedParents[`droppable${i - 1}`] = {...parent[`droppable${i}`]}
              }
              setParent(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            } else {
              // and nullKey index is great than droppableKeyIndex
              const shiftedParents = {};
              for (let i = droppableKeyIndex; i < nullKeyIndex; i++) {
                shiftedParents[`droppable${i + 1}`] = {...parent[`droppable${i}`]}
              }
              setParent(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            }
          } else {
            // and the Draggable component was a child,
            if (droppableKeyIndex === formerDroppableKeyIndexOfActive) {
              setParent(prev => ({...prev, [over.id]: {...prev[over.id], draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            }
            // and formerDroppableKeyIndexOfActive is less than droppableKeyIndex
            else if (formerDroppableKeyIndexOfActive  < droppableKeyIndex) {
              const shiftedParents = {};
              for (let i = droppableKeyIndex; i > formerDroppableKeyIndexOfActive; i--) {
                shiftedParents[`droppable${i - 1}`] = {...parent[`droppable${i}`]}
              }
              setParent(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            } else {
              // and formerDroppableKeyIndexOfActive  index is greater than droppableKeyIndex
              const shiftedParents = {};
              for (let i = droppableKeyIndex; i < formerDroppableKeyIndexOfActive; i++) {
                shiftedParents[`droppable${i + 1}`] = {...parent[`droppable${i}`]}
              }
              setParent(prev => ({...prev, ...shiftedParents, [over.id]: {value: '', draggable: draggableList.filter(element => element.key === active.id)[0]}}));
            }
          }
        }
      }
    } else {
      for (const value in parent) {
        //handle when dragEnd happens outside of a droppable area
        if (parent[value].draggable && parent[value].draggable.key === active.id) {
          setParent(prev => ({...prev, [value]: {...prev[value], draggable: null}}));
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
        {values: parseParents(parent)}
    )
    .then(response => {
      if (response.status === 200) {
        setParent(prev => ({...prev, error: false}))
        setFormState(COMPLETE);
      }
    })
    .catch(err => {
      setParent(prev => ({...prev, error: true}));
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
