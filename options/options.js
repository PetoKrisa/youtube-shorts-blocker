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

async function loadOptionsInUI() {
    let options = await getOptions()
    console.log(options)
    if(options.hide){
        document.getElementById("hide").checked = true
    }
}

document.getElementById("hide").onclick = async (e)=>{
    let options = await getOptions()
    options.hide = e.target.checked
    chrome.storage.local.set({options: options})
}

loadOptionsInUI()