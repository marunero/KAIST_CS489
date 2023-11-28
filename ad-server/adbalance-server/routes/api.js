var express = require('express');
var router = express.Router();

const urlSets = {
  video: {
    1: ['url1', 'url2', 'url3'],
    2: ['url4', 'url5', 'url6'],
    3: ['url7', 'url8', 'url9'],
    4: ['url10', 'url11', 'url12'],
    5: ['url13', 'url14', 'url15'],
  },
  banner: {
    1: ['url1', 'url2', 'url3'],
    2: ['url4', 'url5', 'url6'],
    3: ['url7', 'url8', 'url9'],
    4: ['url10', 'url11', 'url12'],
    5: ['url13', 'url14', 'url15'],
  },
};

/* API requests example http://localhost:3000/api?type=0&level=2 */
router.get('/', function(req, res, next) {
  const level = parseInt(req.query.level);
  const type = parseInt(req.query.type);

  // console.log(level);
  // console.log(type);

  if (type === 0 || type === 1) {
    const typeKey = type === 0 ? 'video' : 'banner';
    // console.log(typeKey);
    if (level >= 1 && level <= 5) {
      const urls = urlSets[typeKey][level];
      // console.log(urls);
      res.json({ urls });
    } else { 
      res.status(400).json({ error: 'Invalid level. Please provide a level between 1 and 5.' });
    }
  } else { 
    res.status(400).json({ error: 'Invalid type. Please provide a type of 0 or 1.' }); 
  }
});

module.exports = router;
