// var gm = require('gm');
 
// customPreprocessor = function(file_or_stream, outfile, cb) {
//   gm(file_or_stream)
//     .resize(400, 200)
//     .in('-level', '25%,75%')
//     .write(outfile, function(error) {
//       cb(error, outfile);
//     });
// };

// const scanner = require('receipt-scanner');
 
// module.exports = () => {
//   scanner('/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt1.JPG')
//     .imagePreprocessor(['opencv', { verbose: true, removeNoise: true }])
//     .parse(function(err, results) {
//       if (err) {
//         return console.error(err);
//       } else {
//         console.log(results);
//       }
//     });
// };
var receipt1 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt1.JPG';
var receipt2 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt2.jpeg';
var receipt3 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt3.jpeg';
var receipt4 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt4.jpeg';
var receipt5 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt5.jpeg';

const config = require('config')['cloudVision'];

var vision = require('@google-cloud/vision')({
  projectId: config.project_id,
  credentials: config
});

// var vision = gcloud.vision();
var receipt2 = {
  source: {
    filename: receipt2
  }
};

var receipt = {
  source: {
    filename: receipt5
  }
};

module.exports = (req, res) => {
  return vision.documentTextDetection(receipt)
    .then(data => {
      // console.log('data: ', data[0].textAnnotations[1].boundingPoly.vertices);
      console.log('text: ', getAllText(data));
      console.log('bounds!: ', data[0].textAnnotations[0].boundingPoly.vertices);
      // console.log('prop: ', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[4]);
      // console.log('blocks! :', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[4].symbols[0].text);
      // console.log('!!blocks: ', data[0].fullTextAnnotation.pages[0].blocks[4]);
      // console.log('!!paragraphs: ', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0]);
      // console.log('!!words: ', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[5]);
      // // console.log('!!!!word: ', getWordFromSymbols(data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[5]));
      console.log('!!!!blocks: ', getBlocksFromImage(data));
      // console.log('!!!!words: ', getAllWordsFromImage(data));
      return getAllWordsFromImage(data);
    })
    .then(data => {
      return res.send(data);
    })
    .catch(() => {
      return res.sendStatus(404);
    });
  // .catch(err => {
  //   console.log('Errror: ', err);
  // });
};

const getWordFromSymbols = (word) => {
  return {
    detectedBreak: word.property.detectedBreak,
    bounds: word.boundingBox.vertices,
    text: word.symbols.map(symbol => {
      return symbol.text;
    }).join('')
  };
};
const getAllBlocks = (data) => {
  return data[0].fullTextAnnotation.pages[0].blocks;
};

const getAllParagraphs = (data) => {
  var paragraphData = [];
  getAllBlocks(data).forEach(block => {
    block.paragraphs.forEach(paragraph => {
      paragraphData.push(paragraph);
    });
  });
  return paragraphData;
};

const getAllWordsFromImage = (data) => {
  var wordData = [];
  getAllParagraphs(data).forEach(paragraph => {
    paragraph.words.forEach(word => {
      wordData.push(getWordFromSymbols(word));
    });
  });
  return wordData;
};

const getAllWordsFromParagraph = (paragraph) => {
  return paragraph.words.map(word => {
    return getWordFromSymbols(word);
  });
};

const getTextFromParagraph = (paragraph) => {
  return getAllWordsFromParagraph(paragraph).map(word => {
    return word.text;
  }).join(' ');
};

const getParagraphsFromImage = (data) =>{
  return getAllParagraphs(data).map(paragraph => {
    return formatParagraph(paragraph);
  });
};

const formatParagraph = (paragraph) => {
  return {
    detectedBreak: paragraph.property.detectedBreak,
    bounds: paragraph.boundingBox.vertices,
    text: getTextFromParagraph(paragraph)
  };
};

const getAllParagraphsFromBlock = (block) => {
  return block.paragraphs.map(paragraph => {
    return formatParagraph(paragraph);
  });
};

const formatBlock = (block) => {
  return {
    bounds: block.boundingBox.vertices,
    detectedBreak: block.property.detectedBreak,
    blockType: block.blockType,
    text: getAllWordsFromBlock(block)
  };
};

const getAllWordsFromBlock = (block) => {
  return getAllParagraphsFromBlock(block).map(paragraph => {
    return paragraph.text;
  }).join('\n');
};

const getBlocksFromImage = (data) => {
  return getAllBlocks(data).map(block => {
    return formatBlock(block);
  });
};

const getAllText = (data) => {
  return data[0].fullTextAnnotation.text;
};