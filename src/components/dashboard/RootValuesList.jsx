import React from 'react';
import RootValues from './RootValues';

export default function RootValuesList(props) {
  
  const { rootValues, keyList } = props;

  

  return (
    <>
      {
        keyList.map((key, index) => {
          return <RootValues rootValues={rootValues} assessmentKey={key} key={index} list={true}/>
        })
      }
    </>  
  );
};