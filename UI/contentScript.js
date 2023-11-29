let popupTimer; // 팝업을 닫기 위한 타이머 변수
let popup; // 팝업 창 객체

function isYouTubePage() {
  return window.location.hostname.includes('youtube.com');
}

function clickPauseButton() {
  const video = document.querySelector('video');
  if (video) {
    video.pause(); // 동영상 일시 정지
    selectQuality(); // 동영상 정지 시 화질 선택
  }
}

function selectQuality() {
  const settingsButton = document.getElementsByClassName("ytp-settings-button")[0];
  if (settingsButton) {
    settingsButton.click();
    setTimeout(chooseQuality, 1000); // 1초(1000ms) 후 화질 선택 함수 호출
  }
}

function chooseQuality() {
  const qualityButton = document.getElementsByClassName("ytp-panel-menu")[0].lastChild;
  if (qualityButton) {
    qualityButton.click();
    setTimeout(() => {
      const desiredQualityOption = [...document.getElementsByClassName("ytp-menuitem")][0];
      if (desiredQualityOption) {
        desiredQualityOption.click(); // 두 번째 화질을 선택하는 클릭 이벤트 발생
        setTimeout(disableQuality, 1000); // 화질 선택 후 1초 뒤에 비활성화 함수 호출
      }
    }, 500); // 0.5초(500ms) 후 화질 선택 로직 실행
  }
}

function disableQuality() {
  const settingsButton = document.getElementsByClassName("ytp-settings-button")[0];
  if (settingsButton) {
    settingsButton.disabled = true;
  }
}

function openPopup() {
  popup = window.open('https://www.youtube.com/watch?v=F2tZreXYZdo', '_blank', 'width=400,height=300,resizable=yes,alwaysRaised=yes');
}

function playVideo() {
  const video = document.querySelector('video');
  if (video && video.paused) {
    video.play(); // 동영상 다시 재생
  }
}

function reopenPopup() {
  clearTimeout(popupTimer); // 타이머 클리어
  openPopup(); // 팝업 다시 열기
}

if (isYouTubePage()) {
  clickPauseButton(); // 유튜브 동영상 일시 정지
  openPopup(); // 팝업 열기

  popupTimer = setTimeout(() => {
    if (popup && !popup.closed) {
      popup.close(); // 일정 시간 후에 팝업 닫기
      playVideo(); // 팝업이 닫힐 때 동영상 다시 재생
    }
  }, 10000); // 10초 (1000ms * 10)

  // 팝업을 수동으로 닫았을 때 새로운 팝업 열기
  window.addEventListener('beforeunload', function (e) {
    if (popup && !popup.closed) {
      e.preventDefault();
      reopenPopup();
    }
  });
}
