let popupTimer; // 팝업을 닫기 위한 타이머 변수
let popup; // 팝업 창 객체

let urls = ['https://www.youtube.com/watch?v=F2tZreXYZdo', 'https://www.youtube.com/watch?v=yoG7gqet7nY&list=LL&index=70'];
let level = 3;
let order = 0;

function isYouTubePage() {
  return window.location.hostname.includes('youtube.com');
}

function clickPauseButton() {
  const video = document.querySelector('video');
  if (video) {
    video.pause(); // 동영상 일시 정지
  }
}

function selectQuality() {
  const settingsButton = document.getElementsByClassName("ytp-settings-button")[0];
  if (settingsButton) {
    settingsButton.click();
    setTimeout(chooseQuality, 500); // 1초(1000ms) 후 화질 선택 함수 호출
  }
}

function chooseQuality() {
  const qualityButton = document.getElementsByClassName("ytp-panel-menu")[1].lastChild;
  if (qualityButton) {
    qualityButton.click();
    setTimeout(() => {
      const desiredQualityOption = [...document.getElementsByClassName("ytp-menuitem")][5-level];
      if (desiredQualityOption) {
        desiredQualityOption.click(); // 두 번째 화질을 선택하는 클릭 이벤트 발생
        setTimeout(disableQuality, 500); // 화질 선택 후 1초 뒤에 비활성화 함수 호출
      }
    }, 1000); // 0.5초(500ms) 후 화질 선택 로직 실행
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
    video.play(); // 동영상 다시 재생
  }
}

function cycle(runtimes) {
  clickPauseButton(); // 유튜브 동영상 일시 정지
  openPopup(urls[order]); // 팝업 열기

  var i = 0;
  var popupTimer = 0;
  var timer = setInterval(function() { 
    if (popupTimer<runtimes[i] && popup.closed) {
      popupTimer = 0;
      openPopup(urls[order]); // 팝업을 수동으로 닫았을 때 새로운 팝업 열기
    }
    if (popupTimer>=runtimes[i] && popup && !popup.closed) {
      popup.close(); // 일정 시간 후에 팝업 닫기
      order++;
      i++;
      if (i<runtimes.length) {
        openPopup(urls[order]);
        popupTimer = 0;
      } else {
        clearInterval(timer);
        playVideo(); // 팝업이 닫힐 때 동영상 다시 재생
      }
    }
    popupTimer++;
  }, 1000);
}

if (isYouTubePage()) {
  selectQuality();

  if (level == 0) {
    playVideo();
  } else if (level == 1) {
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
