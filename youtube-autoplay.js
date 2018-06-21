setInterval(function(){
if((document.querySelector(".ytp-play-button").getAttribute("aria-label"))!=="Pause"){
document.querySelector(".ytp-play-button").click();
}
}, 1000)