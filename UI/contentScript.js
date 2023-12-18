let popupTimer;
let popup;

let urls = ['https://www.youtube.com/watch?v=F2tZreXYZdo', 'https://www.youtube.com/watch?v=yoG7gqet7nY&list=LL&index=70'];
let level = 0;
let order = 0;

function isYouTubePage() {
  return window.location.href.includes('youtube.com/watch');
}

function clickPauseButton() {
  const video = document.querySelector('video');
  if (video) {
    video.pause(); // Pause the video, no matter what current condition is
  }
}

function selectQuality() {
  const settingsButton = document.getElementsByClassName("ytp-settings-button")[0];
  if (settingsButton) {
    settingsButton.click();
    setTimeout(chooseQuality, 500);
  }
}

function chooseQuality() {
  const qualityButton = document.getElementsByClassName("ytp-panel-menu")[1].lastChild;
  if (qualityButton) {
    qualityButton.click();
    setTimeout(() => {
      const desiredQualityOption = [...document.getElementsByClassName("ytp-menuitem")][5-level];
      if (desiredQualityOption) {
        desiredQualityOption.click(); // Choose the quality based on the level
        setTimeout(disableQuality, 500);
      }
    }, 1000);
  }
}

function disableQuality() {
  const settingsButton = document.getElementsByClassName("ytp-settings-button")[0];
  if (settingsButton) {
    settingsButton.disabled = true;
  }
}

function openPopup(url) {
  var _width = 800;
  var _height = 500;
  var _left = Math.ceil((window.screen.width-_width)/2);
  var _top = Math.ceil((window.screen.height-_height)/2);
  popup = window.open(url, '_blank', 'width='+_width+', height='+_height+',left='+_left+',top='+_top+',resizable=yes,alwaysRaised=yes');
}

function playVideo() {
  const video = document.querySelector('video');
  if (video && video.paused) {
    video.play();
  }
}

function cycle(runtimes) {
  clickPauseButton(); // Pause the video
  openPopup(urls[order]); // Open pop-up ad

  var i = 0;
  var popupTimer = 0;
  var timer = setInterval(function() { 
    if (popupTimer<runtimes[i] && popup.closed) {
      popupTimer = 0;
      openPopup(urls[order]); // Open pop-up ad again if it is closed manually
    }
    if (popupTimer>=runtimes[i] && popup && !popup.closed) {
      popup.close(); // Close the pop-up ad after the guaranteed time passed
      order++;
      i++;
      if (i<runtimes.length) {
        openPopup(urls[order]);
        popupTimer = 0;
      } else {
        clearInterval(timer);
        playVideo(); // Play the video when all pop-up ads are closed normally
      }
    }
    popupTimer++;
  }, 1000);
}

if (isYouTubePage()) {
  selectQuality();

  if (level == 1) {
    cycle(new Array('5'));
  } else if (level == 2) {
    cycle(new Array('30'));
  } else if (level == 3) {
    cycle(new Array('30', '5'));
  } else if (level == 4) {
    cycle(new Array('30', '30'));
  } else if (level == 5) {
    cycle(new Array('30', '30', '5', '5'));
  }
}
