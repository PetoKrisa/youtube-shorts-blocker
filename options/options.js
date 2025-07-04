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

async function loadOptionsInUI() {
    let options = await getOptions()
    let statistics = await getStatistics()
    console.log(options)
    if(options.hide){
        document.getElementById("hide").checked = true
    }
    document.getElementById("hidden").innerText = statistics.hidden
    document.getElementById("time").innerText = calculateLengthString(statistics.hidden)
}

function calculateLengthString(amount) {
    let totalsec = amount * 38
    hours = Math.floor(totalsec / 3600)
    minutes = Math.floor((totalsec % 3600) / 60)
    return `${hours} h ${minutes} m`
}


document.getElementById("hide").onclick = async (e)=>{
    let options = await getOptions()
    options.hide = e.target.checked
    chrome.storage.local.set({options: options})
}

loadOptionsInUI()