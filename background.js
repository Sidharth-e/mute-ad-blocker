function updateAdblockerRules(isEnabled) {
  fetch(chrome.runtime.getURL('ads_rules.json'))
    .then(r => r.json())
    .then(adBlockRules => {
      const ruleIds = adBlockRules.map(rule => rule.id);
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds,
        addRules: isEnabled ? adBlockRules : [],
      }, () => {
        console.log('Updated Adblocker Rules:', isEnabled, adBlockRules.length);
      });
    })
    .catch(e => {
      console.error('Adblocker: problem with ads_rules.json', e);
    });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.adblockerEnabled) {
    console.log('Toggle Changed:', changes.adblockerEnabled);
    updateAdblockerRules(changes.adblockerEnabled.newValue);
  }
});

function applyInitialRules() {
  chrome.storage.sync.get({ adblockerEnabled: true }, (result) => {
    updateAdblockerRules(result.adblockerEnabled);
  });
}

chrome.runtime.onInstalled.addListener(applyInitialRules);
chrome.runtime.onStartup.addListener(applyInitialRules);

// Inject content.js for cosmetic filtering
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
