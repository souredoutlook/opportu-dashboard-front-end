//src/helpers/rootValues.js

const parseValues = function(rootValues, wordcloud) {

  const latest = Object.keys(rootValues).sort((a,b)=>Date.parse(rootValues[b].completed) - Date.parse(rootValues[a].completed))[0];

  if (wordcloud) {
    return [...rootValues[latest].values].map((element, index) => {
        return { text: element, value: - (index + 1)}
      });
  } else {
    return [...rootValues[latest].values]
  }
};

// comment out line 11 in RootValues and export this array for assorted color values
// const colors =
//   ['#579BC0',
//   '#A0C6DD',
//   '#8F8679',
//   '#E09D4B',
//   '#DEC4A0']

const colors = {
  1: '#579BC0',
  2: '#579BC0',
  3: '#A0C6DD',
  4: '#A0C6DD',
  5: '#A0C6DD',
  6: '#8F8679',
  7: '#8F8679',
  8: '#8F8679',
  9: '#DEC4A0',
  10: '#DEC4A0',
};

module.exports = { parseValues, colors };