var express = require('express');
var router = express.Router();

const url1 = 'https://www.youtube.com/watch?v=p_7WsfD4KUY';
const url2 = 'https://www.youtube.com/watch?v=sW9kJ0fOKWY';
const url3 = 'https://www.youtube.com/watch?v=upKuFIIORgI';
const url4 = 'https://www.youtube.com/watch?v=UEYCIqrlayc';
const url5 = 'https://www.youtube.com/watch?v=iVY5WivkLyM';

const urlSets = {
  video: {
    0: {level: 0,
        urls: [],
        resolution: '480p30',
        // duration: 15,
      },
    1: {level: 1,
      urls: [url1],
      resolution: '720p30',
      // duration: 15,
      },
    2: {level: 2,
      urls: [url1],
      resolution: '720p60',
      // duration: 15,
      },
    3: {level: 4,
      urls: [url1, url2],
      resolution: '1080p30',
      // duration: 15,
      },
    4: {level: 4,
      urls: [url1, url2],
      resolution: '1080p60',
      // duration: 15,
      },
    5: {level: 5,
      urls: [url1, url2, url3, url4, url5],
      resolution: '1080p60',
      // duration: 15,
      },
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

  console.log(level);
  console.log(type);

  if (type === 0 || type === 1) {
    const typeKey = type === 0 ? 'video' : 'banner';
    // console.log(typeKey);
    if (level >= 0 && level <= 5) {
      // console.log(typeof level);
      console.log(urlSets[typeKey][level]);
      res.json(urlSets[typeKey][level]);
    } else { 
      res.status(400).json({ error: 'Invalid level. Please provide a level between 1 and 5.' });
    }
  } else { 
    res.status(400).json({ error: 'Invalid type. Please provide a type of 0 or 1.' }); 
  }
});

module.exports = router;
