// const regExp = /(\d*)+([^]*)(\$*)(\d+\.\d+)/;
// const regExp = /(\d+\.\d+)*\s*(\d*)+\s*([^]*)\s(\$*)(\d+\.\d+)/;
const itemExp = /(\d+\.\d+)*\s*(\d*)+\s*([^]*)\s(?:\$*)(\d+\.\d+)/;
const itemExpWithTextAfterPrice = /(\d+\.\d+)*\s*(\d*)+\s*([^]*)\s(?:\$*)(\d+\.\d+)*/;
const totalExp = /(?:[^]*)(?:\bTotal)+(?:[^]*)\s(?:\$*)(\d+\.\d+)*/i;
const taxExp = /(?:[^]*)(?:\btax)+(?:[^]*)\s(?:\$*)(\d+\.\d+)*/i;
const priceExp = /(\d+\.\d+)/;

module.exports = {
  
  items: (lines) => {
    return lines.map(line => {
      return deconstructLine(line);
    });
  },

  total: (line, allTextLines) => {
    console.log(allTextLines);
    return totalOrTax(line, allTextLines, totalExp);
  },

  tax: (line, allTextLines) => {
    return totalOrTax(line, allTextLines, taxExp);
  }
};

const deconstructLine = (line) => {
  var match = line.text.match(itemExp);
  if (match === null || match[4] === undefined) {
    match = line.text.match(itemExpWithTextAfterPrice);
  }
  if (match === null || match[4] === undefined) {
    var price = line.text.match(priceExp);
    console.log('price: ', price);
    match[4] = !!price ? price[1] : undefined;
  }
  console.log('match: ', match);
  return match !== null ? {
    quantity: !match[1] ? match[2] : '1',
    // 'pre-item': match[0],
    name: !match[1] ? match[3] : match[1] + match[2] + match[3],
    price: match[4]
  } : {
    name: '',
    price: ''
  };
};

const deconstructTaxOrTotal = (line, regExp) => {
  var match = line.text.match(regExp);
  return match !== null ? {
    price: match[1],
    quantity: '',
    name: ''
  } : null;
};

const searchAllText = (lines, regExp) => {
  return lines.reduce((acc, line) => {
    var match = deconstructTaxOrTotal(line, regExp);
    return !!match ? match : acc;
  }, null);
};

const totalOrTax = (line, allTextLines, regExp) => {
  return !line ? searchAllText(allTextLines, regExp) : deconstructLine(line);
};

