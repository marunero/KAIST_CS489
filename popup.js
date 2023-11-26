
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
  };

  // 초기 UI 설정
  updateUI(levelSlider.value);
});