let level_save = 1;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ level_save });
  console.log('current setting = ', `levels: ${level_save}`);
});