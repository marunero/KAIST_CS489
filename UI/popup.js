let popupTimer; // 팝업을 닫기 위한 타이머 변수
let popup; // 팝업 창 객체

let urls = ['https://www.youtube.com/watch?v=F2tZreXYZdo', 'https://www.youtube.com/watch?v=yoG7gqet7nY&list=LL&index=70'];
let level = 3;
let order = 0;

function sendGetRequest(level) {

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
                data = urls
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

  function updateUI(lev) {
      levelValue.textContent = lev;
      level = lev
      resolutionValue.textContent = levels[level].resolution;
      ad30sCount.textContent = levels[level].ad30s;
      ad5sCount.textContent = levels[level].ad5s;
  }

  levelSlider.oninput = function() {
      updateUI(this.value);
      sendGetRequest(this.value);
  };

  // 초기 UI 설정
  updateUI(levelSlider.value);
  
});

function getRequest(){
    var levelSlider = document.getElementById('levelSlider');
    sendGetRequest(levelSlider.value)
}

let apply = document.getElementById("Apply");

apply.addEventListener("click", async () => { 

    console.log("hi")
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
        const currentTabId = tabs[0].id;
    
        // Use the currentTabId with chrome.scripting.executeScript
        chrome.scripting.executeScript({
            target: { tabId: currentTabId },
            function: (urls, level) => {

                function callAds() {
                    // Your function logic here
                    let popupTimer; // 팝업을 닫기 위한 타이머 변수
                    let popup; // 팝업 창 객체

                    // let urls = ['https://www.youtube.com/watch?v=F2tZreXYZdo', 'https://www.youtube.com/watch?v=yoG7gqet7nY&list=LL&index=70'];
                    // let level = 2;
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
                }
                function addClickListenerOnce() {
                    // Add a click event listener with the "once" option
                    document.addEventListener('click', function handleClickOnce(event) {
                      event.preventDefault(); // Prevent the default click behavior (e.g., navigation)
                  
                      callAds();
                  
                      // Remove the event listener so it won't trigger again
                      document.removeEventListener('click', handleClickOnce);
                    });
                }

                
                addClickListenerOnce();
                
            }, 
            args: [urls, level],
        });
        }
    });
    


  });

