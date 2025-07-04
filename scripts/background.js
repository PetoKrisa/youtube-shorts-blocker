function updateHandler(tabId, changeInfo, tab) {
    if ((changeInfo.url != undefined && tab.url.includes("youtube.com"))) {
    console.log("trying to send message")
    chrome.tabs.sendMessage(tabId, {action: "checkForShorts"}, (m)=>{
        console.log("message sent, response recieved")
    })
    }
} 

chrome.tabs.onUpdated.addListener(updateHandler);