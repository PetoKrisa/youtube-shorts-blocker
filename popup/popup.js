const toggleBtn = document.getElementById("toggleBtn")
const statusTxt = document.getElementById("statusTxt")



//set version
fetch("../manifest.json")
.then(r=>r.json())
.then(d=>{
    document.getElementById("ver").innerText = `v${d.version}`
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

async function toggleBlocker(e){
    let status = await getStatus()
    if(status == "on"){
        chrome.storage.local.set({"status": "off"})
    } else if(status == "off"){
        chrome.storage.local.set({"status": "on"})
    }

    console.log(status)

    updateButtonColor()
}

async function updateButtonColor(){
    toggleBtn.classList.remove("on")
    toggleBtn.classList.remove("off")

    statusTxt.classList.remove("red")
    statusTxt.classList.remove("green")

    let status = await getStatus()

    if(status == "on"){
        toggleBtn.classList.add("on")

        statusTxt.innerText = "on"
        statusTxt.classList.add("green")
    } else{
        toggleBtn.classList.add("off")

        statusTxt.innerText = "off"
        statusTxt.classList.add("red")
    }

}

toggleBtn.addEventListener("click", toggleBlocker)

window.onpopstate = (e)=>{alert("asd")}

updateButtonColor()
