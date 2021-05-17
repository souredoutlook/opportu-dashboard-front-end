//src/helpers/assessments.js

const parseParents = function(parents) {
  const keys = Object.keys(parents)
  console.log(keys);
  if (keys.length === 11 && !keys.includes(null)) {
    //checks to see that all 11 keys are present and that no keys are null

    const values = keys.reduce((prev, cur) => {
      if (parents[cur] && cur !== 'error'){
        //ensures that custom values are not falsey
        console.log(prev, cur);
        const value = (parents[cur].props && parents[cur].props.children) || parents[cur].custom;
        const is_custom = !parents[cur].props;
        prev.push({value, is_custom});
        return prev;
      } else {
        return prev;
      }
    }, [])
    return values.length === 10 ? values : null;
  } else {
    return null;
  }
};

module.exports = { parseParents };

// values: [
//   { value: 'Ambition', is_custom: false },
//   { value: 'Authority', is_custom: false },
//   { value: 'Autonomy', is_custom: false },
//   { value: 'Beauty', is_custom: false },
//   { value: 'Belonging', is_custom: false },
//   { value: 'Boldness', is_custom: false },
//   { value: 'Buoyancy', is_custom: false },
//   { value: 'Calm', is_custom: false },
//   { value: 'Celebrity/Fame', is_custom: false },