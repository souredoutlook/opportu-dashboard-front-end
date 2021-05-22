// helpers/dashboard.js

const capitalize = function(string) {
  return string.split('').map((value,index)=>index === 0 ? value.toUpperCase() : value).join('')
};

module.exports = { capitalize };