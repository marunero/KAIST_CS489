function sendGetRequest(level) {
    document.getElementById('getrequest').textContent = level;

    // Check if level is a number and within expected range
    if (!isNaN(level) && level >= 1 && level <= 5) {
        // Construct the URL with the level value
        var url = 'http://localhost:3000/api?type=0&level=' + level;

        // Fetch API to send the GET request
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)

                // TODO
                // add contentScript.js function
            })
            .catch(error => {
                console.log(error)
            });
    } else {
        console.error('Invalid level value. Please enter a number between 1 and 5.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
  var levelSlider = document.getElementById('levelSlider');
  var levelValue = document.getElementById('levelValue');
  var resolutionValue = document.getElementById('resolutionValue');
  var ad30sCount = document.getElementById('ad30sCount');
  var ad5sCount = document.getElementById('ad5sCount');

  var levels = [
      { resolution: '480p30', ad30s: 0, ad5s: 0 },
      { resolution: '720p30', ad30s: 0, ad5s: 1 },
      { resolution: '720p60', ad30s: 1, ad5s: 0 },
      { resolution: '1080p30', ad30s: 1, ad5s: 1 },
      { resolution: '1080p60', ad30s: 2, ad5s: 0 },
      { resolution: '4K30', ad30s: 3, ad5s: 2 }
  ];

  function updateUI(level) {
      levelValue.textContent = level;
      resolutionValue.textContent = levels[level].resolution;
      ad30sCount.textContent = levels[level].ad30s;
      ad5sCount.textContent = levels[level].ad5s;
  }

  levelSlider.oninput = function() {
      updateUI(this.value);
    //   sendGetRequest(this.value);
  };

  // 초기 UI 설정
  updateUI(levelSlider.value);
  
});

function getRequest(){
    var levelSlider = document.getElementById('levelSlider');
    sendGetRequest(levelSlider.value)
}

// call request every 20 seconds
setInterval(getRequest, 20000);
