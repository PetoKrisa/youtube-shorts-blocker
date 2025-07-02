chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.action=="checkForShorts"){
        redirectIfShorts()
    }
    sendResponse({status: "ok"})
})

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
        window.location = "/"
    }
}

redirectIfShorts()