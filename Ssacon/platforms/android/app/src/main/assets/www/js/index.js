// var app = {
//     initialize: function() {
//         this.bindEvents();
//     },

//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
//         document.getElementById("worker").addEventListener("click", this.goWorkerPage.bind(this))
//         document.getElementById("manager").addEventListener("click", this.goManagerPage.bind(this))
//     },

//     onDeviceReady: function() {
//         console.log('firstPage');
//     },

//     goWorkerPage: function() {
//         window.location = "./template/testrouter/testrouter.html";
//     },

//     goManagerPage: function() {
//         window.location = "./template/monitor/monitor.html";
//     }
// }

// app.initialize()
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // cordova.plugins.notification.local.hasPermission(function (granted) { ... });


    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.disableBatteryOptimizations();
    cordova.plugins.backgroundMode.setDefaults({
        title: '앱이 백그라운드에서 작동중입니다.',
        text: '3초마다 정보를 보내고 받는 중입니다...',
    })
    console.log('씨빠왜안대또')
    setInterval(() => {
        const now = new Date();
    //    console.log((now.getMonth()+1)+"/"+now.getDate() + " " + now.getHours()+":"+now.getMinutes()+":"
    //    +now.getSeconds())
        fetch('http://k4b101.p.ssafy.io/api/test/2000', {method:'POST',})
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            cordova.plugins.notification.local.schedule({
                title: "ㅎㅎ",
                text: '쩌럿다',
            })
            console.log(result);
        })
        .catch((error) => {
        console.error(error)
        })
    }, 10000);
    // fetch('http://k4b101.p.ssafy.io/api/beacon/', {method:'GET',})
    // .then((response) => {
    //     return response.json();
    // })
    // .then((result) => {
    //     console.log(result);
    // })
    // .catch((error) => {
    //     console.error(error)
    // })
    cordova.plugins.backgroundMode.on('activate', function() {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
     });
    
}