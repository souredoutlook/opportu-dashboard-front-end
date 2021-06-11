import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  const style = {
    border: isOver ? '0.125em solid #E09D4B' : '0.125em solid transparent',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};