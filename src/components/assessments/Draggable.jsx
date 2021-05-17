import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export default function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    width: '10rem',
  };

  const onClick = (event)=> {
    event.preventDefault(); 
  }
  return ( 
    <button className='draggable' ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={onClick}>
      {props.children}
    </button>
  );
};