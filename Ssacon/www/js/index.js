<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> e75e40992f2151197b124ef0df07b3dd5d3a02d7
var app = {
    initialize: function() {
        this.bindEvents();
    },
<<<<<<< HEAD
=======
=======
// var app = {
//     initialize: function() {
//         this.bindEvents();
//     },
>>>>>>> e75e40992f2151197b124ef0df07b3dd5d3a02d7

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
        document.getElementById("worker").addEventListener("click", this.goWorkerPage.bind(this))
        document.getElementById("manager").addEventListener("click", this.goManagerPage.bind(this))
        document.getElementById("loginpage").addEventListener("click", this.goLoginPage.bind(this))
    },

    onDeviceReady: function() {
        console.log('firstPage');
    },

    goWorkerPage: function() {
        window.location = "./template/testrouter/testrouter.html";
    },

    goManagerPage: function() {
        window.location = "./template/monitor/monitor.html";
    },

    goLoginPage: function() {
        window.location = "./template/login/login.html";
    },
}

app.initialize()

<<<<<<< HEAD

// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!
=======
// app.initialize()
document.addEventListener('deviceready', onDeviceReady, false);
>>>>>>> 6f85f910adca08d8921f4d833010f49a10c33b40

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
        document.getElementById("worker").addEventListener("click", this.goWorkerPage.bind(this))
        document.getElementById("manager").addEventListener("click", this.goManagerPage.bind(this))
    },

<<<<<<< HEAD
    onDeviceReady: function() {
        console.log('firstPage');
    },

    goWorkerPage: function() {
        window.location = "./template/testrouter/testrouter.html";
    },

    goManagerPage: function() {
        window.location = "./template/monitor/monitor.html";
    }
}

app.initialize()
=======
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');
>>>>>>> e75e40992f2151197b124ef0df07b3dd5d3a02d7

//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     document.getElementById('deviceready').classList.add('ready');

//     // cordova.plugins.notification.local.hasPermission(function (granted) { ... });

<<<<<<< HEAD

//     cordova.plugins.backgroundMode.enable();
//     cordova.plugins.backgroundMode.overrideBackButton();
//     cordova.plugins.backgroundMode.disableBatteryOptimizations();
//     cordova.plugins.backgroundMode.setDefaults({
//         title: '앱이 백그라운드에서 작동중입니다.',
//         text: '3초마다 정보를 보내고 받는 중입니다...',
//     })
//     console.log('씨빠왜안대또')
//     setInterval(() => {
//         const now = new Date();
//     //    console.log((now.getMonth()+1)+"/"+now.getDate() + " " + now.getHours()+":"+now.getMinutes()+":"
//     //    +now.getSeconds())
//         fetch('http://k4b101.p.ssafy.io/api/test/2000', {method:'POST',})
//         .then((response) => {
//             return response.json();
//         })
//         .then((result) => {
//             cordova.plugins.notification.local.schedule({
//                 title: "ㅎㅎ",
//                 text: '쩌럿다',
//             })
//             console.log(result);
//         })
//         .catch((error) => {
//         console.error(error)
//         })
//     }, 10000);
//     // fetch('http://k4b101.p.ssafy.io/api/beacon/', {method:'GET',})
//     // .then((response) => {
//     //     return response.json();
//     // })
//     // .then((result) => {
//     //     console.log(result);
//     // })
//     // .catch((error) => {
//     //     console.error(error)
//     // })
//     cordova.plugins.backgroundMode.on('activate', function() {
//         cordova.plugins.backgroundMode.disableWebViewOptimizations();
//      });
    
// }
=======
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.disableBatteryOptimizations();
    cordova.plugins.backgroundMode.setDefaults({
        title: '앱이 백그라운드에서 작동중입니다.',
        text: '3초마다 정보를 보내고 받는 중입니다...',
    })
    setInterval(() => {
        const now = new Date();
    //    console.log((now.getMonth()+1)+"/"+now.getDate() + " " + now.getHours()+":"+now.getMinutes()+":"
    //    +now.getSeconds())
        fetch('http://k4b101.p.ssafy.io/api/beacon/list', {method:'POST',})
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            alarmlist = result.data
            let items = []
            alarmlist = [
                {
                    "id": 1,
                    "type": "takeover",
                    "line": "line1",
                    "Location": "F2",
                    "equipment": "D2",
                    "writer": "구진범",
                    "description": "매 정각 3번 안전핀 확인",
                    "time": "2020-05-14 16:43:22",
                },
                {
                    "id": 2,
                    "type": "checksheet",
                    "line": "line1",
                    "equipment": "D2",
                    "properLocation": "D3",
                    "submissionLocation": "D4",
                    "time": "2020-05-14 16:43:22",
                },
                {
                    "id": 3,
                    "type": "warning",
                    "line": "line1",
                    "location": "F2",
                    "equipment": "D2",
                    "minProperHumidity": 25.2,
                    "maxProperHumidity": 27.2,
                    "minProperTemperature": 13.3,
                    "maxProperTemperature": 15.6,
                    "nowHumidty": 22.2,
                    "nowTemperature": 17.4,
                    "time": "2020-05-14 16:43:22",
                },
                {
                    "id": 4,
                    "type": "attendance",
                    "line": "line1",
                    "session": "정기 안전교육",
                    "time": "2020-05-14 16:43:22",
                },
                {
                    "id": 5,
                    "type": "battery",
                    "line": "line1",
                    "location": "F2",
                    "equipment": "D2",
                    "battery": 32.5,
                    "time": "2020-05-14 16:43:22",
                },
            ]
            alarmlist.forEach((alarm) => {
                let item = {}
                let title;
                let description;
                let icon;
                if(alarm.type == "takeover") {
                    title = "인수 인계"
                    description = alarm.line+ " " + alarm.equipment+ " " + alarm.description + " - " + alarm.writer
                    icon="res://info.png"                }
                else if(alarm.type == "checksheet") {
                    if(alarm.properLocation == alarm.submissionLocation) {
                        // 잘 제출 한 경우
                        title = "체크시트 제출 확인"
                        description = alarm.submissionLocation + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                        icon="res://success.png"                    }
                    else {
                        title = "잘못된 위치에서 체크시트 제출"
                        description = alarm.submissionLocation + " 위치에서 " + alarm.properLocation + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                        icon="res://warning.png"
                    }
                }
                else if(alarm.type == "warning") {
                    title = "위험"
                    description = alarm.location + " 위치의 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요" 
                    icon="res://danger.png"
                }
                else if(alarm.type == "attendance") {
                    title= "출석 확인"
                    description = alarm.session + " 출석 확인"
                    icon="res://success.png"
                }
                else if(alarm.type == "battery") {
                    title="비콘 배터리 잔량 부족"
                    description = alarm.line+ " " + alarm.location + " 위치 " + 
                    alarm.equipment + " 비콘 배터리 잔량이 " + alarm.battery + 
                    "%입니다. 점검해주세요."
                    icon="res://danger.png"
                }
                item["id"] = alarm.id
                item["title"] = title
                item["text"] = description
                item["icon"] = icon
                items.push(item)
            })
            // 이제 알람 띄움
            cordova.plugins.notification.local.schedule(items)
            cordova.plugins.notification.local.on('click', function(notification) {
                console.log(notification)
                window.location = "file:///android_asset/www/template/alarm/alarmdetail.html" + "?id=" + notification.id ;
            })
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
>>>>>>> 6f85f910adca08d8921f4d833010f49a10c33b40
>>>>>>> e75e40992f2151197b124ef0df07b3dd5d3a02d7
