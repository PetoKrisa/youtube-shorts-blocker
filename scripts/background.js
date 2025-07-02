function updateHandler(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, {action: "checkForShorts"}, (m)=>{})
    }
} 

chrome.tabs.onUpdated.addListener(updateHandler);