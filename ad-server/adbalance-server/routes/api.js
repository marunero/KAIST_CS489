var express = require('express');
var router = express.Router();

const urlSets = {
  1: ['url1', 'url2', 'url3'],
  2: ['url4', 'url5', 'url6'],
  3: ['url7', 'url8', 'url9'],
  4: ['url10', 'url11', 'url12'],
  5: ['url13', 'url14', 'url15'],
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  const level = parseInt(req.query.level);
  console.log(level);

  if (level >= 1 && level <= 5) {
    const urls = urlSets[level];
    res.json({ urls });
  } else {
    res.status(400).json({ error: 'Invalid level. Please provide a level between 1 and 5.' });
  }
  
});

module.exports = router;
