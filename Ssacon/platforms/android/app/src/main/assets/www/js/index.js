// background mode
// document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.disableBatteryOptimizations();
    setInterval(() => {
        const now = new Date();
    //    console.log((now.getMonth()+1)+"/"+now.getDate() + " " + now.getHours()+":"+now.getMinutes()+":"
    //    +now.getSeconds())
        fetch('http://k4b101.p.ssafy.io/api/test/2000', {method:'POST',})
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
        console.error(error)
        })
    }, 3000);
    fetch('http://k4b101.p.ssafy.io/api/beacon/', {method:'GET',})
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error)
    })
    cordova.plugins.backgroundMode.on('activate', function() {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
     });
}