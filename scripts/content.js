chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.action=="checkForShorts"){
        redirectIfShorts()
        hideShorts()
    }
    sendResponse({status: "ok"})
})

function getStatistics(){
    return new Promise((resolve, reject)=>{
        chrome.storage.local.get(['statistics'], (result) => {

        if(result.statistics == undefined || result.statistics == null){
            chrome.storage.local.set({"statistics": {
                "hidden": 0
            }})
            resolve({
                "hidden": 0
            })
        }

        if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
        } else {
            resolve(result.statistics);
        }
    });
    })
}

async function addHiddenShortToStatistic(amount){
    let statistics = await getStatistics()
    statistics.hidden += amount
    chrome.storage.local.set({"statistics": {"hidden": statistics.hidden+amount}})
}

function getOptions(){
    return new Promise((resolve, reject)=>{
        chrome.storage.local.get(['options'], (result) => {

        if(result.options == undefined || result.options == null){
            chrome.storage.local.set({"options": {
                "hide": false
            }})
            resolve({
                "hide": false
            })
        }

        if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
        } else {
            resolve(result.options);
        }
    });
    })
}

function getStatus() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['status'], (result) => {

        if(result.status == undefined || result.status == null){
            chrome.storage.local.set({"status": "on"})
            resolve("on")
        }

        if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
        } else {
            resolve(result.status);
        }
    });
  });
}

async function redirectIfShorts(){
    let status = await getStatus()
    if(status != "on"){
        return
    } 

    if(window.location.pathname.includes("shorts")){
        await addHiddenShortToStatistic(1)
        window.location = "/"
    }
}

function injectStyle() {
  const style = document.createElement("style");
  style.textContent = `
    ytd-reel-shelf-renderer, ytd-rich-shelf-renderer {
      display: none !important
    }
    grid-shelf-view-model *{
        display: none !important;
    }
    #sections ytd-guide-section-renderer:nth-child(1) #items>ytd-guide-entry-renderer:nth-child(2) {
      display: none
    }
  `;
  document.head.appendChild(style);
}

async function hideShorts() {
    let status = await getStatus()
    let options = await getOptions()
    if(status == "off" || !options.hide){
        return
    }
    if(window.location.pathname == "/watch"){
        await addHiddenShortToStatistic(9)
    }
    if(window.location.pathname == "/"){
        await addHiddenShortToStatistic(6)
    }
    if(window.location.pathname == "/results"){
        await addHiddenShortToStatistic(6)
    }

    injectStyle()
}
console.log("content.js loaded - yt shorts blocker")


hideShorts()
redirectIfShorts()
