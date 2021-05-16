const { Manager, Connection } = require('buildthing-ble-sdk')

let beaconList = [];

var beaconScan = {
   initialize: function() {
     this.bleManager = null
     this.bindEvents();
   },

   bindEvents: function() {
       document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
       document.getElementById("startScanBtn").addEventListener("click", this.startScan.bind(this))
       document.getElementById("stopScanBtn").addEventListener("click", this.stopScan.bind(this))
       document.getElementById("sendBeaconInfo").addEventListener("click", this.sendBeacon.bind(this))
<<<<<<< HEAD
       document.getElementById("checkAttendance").addEventListener("click", this.eduCheckAttendance.bind(this))

       
       
       document.getElementById("addBeacon").addEventListener("click", this.callBeaconListDB.bind(this))
=======
>>>>>>> 6f85f910adca08d8921f4d833010f49a10c33b40
   },

   onDeviceReady: function() {
     console.log('df');
    this.bleManager = new Manager()
    this.bleManager.on('stateChange', function (state) {
      console.log(state)
      if(state === 'poweredOn') {
        this.bleManager.setBackgroundBetweenScanPeriod(0)
        this.bleManager.setBackgroundScanPeriod(2000)
        this.bleManager.setForegroundBetweenScanPeriod(0)
        this.bleManager.setForegroundScanPeriod(2000)
        this.bleManager.updateScanPeriod()
        this.bleManager.startScan()
      }
      else {
         alert('블루투스 기능이 꺼져 있습니다.')
      }
    }.bind(this))

    // beacon discover
    this.bleManager.on('discover', function(beacon) {
      console.log(beaconList);
      if (beacon.sensors.length === 0) {
        beaconList.push({
            beacon_id: beacon.id,
            beacon_name: beacon.name,
            temperature: 0,
            humidity: 0,
            vbatt: beacon.vbatt.percentage.value
        })
      } else {
        beaconList.push({
            beacon_id: beacon.id,
            beacon_name: beacon.name,
            temperature: beacon.sensors[0].data.temperature.value,
            humidity: beacon.sensors[0].data.humidity.value,
            vbatt: beacon.vbatt.percentage.value
        })
      }
    })

    let userInfo = window.localStorage.getItem("userInfo");
      // console.log(JSON.parse(userInfo));
    userInfo = JSON.parse(userInfo);
    const userID = userInfo.data.userId;

    setInterval(() => {
      fetch(`http://k4b101.p.ssafy.io/api/beacon/scanInfo/${userID}`, {
        method:'POST',
        headers: {
         'Content-Type': 'application/json',
       },
        body: JSON.stringify(beaconList),
      })
      .then((response) => {
          return response.json();
      })
      .then((result) => {
       alarmlist = result.data
       let items = []
      if(alarmlist){
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
                if(alarm.properBeaconId == alarm.submissionBeaconId) {
                    // 잘 제출 한 경우
                    title = "체크시트 제출 확인"
                    description = alarm.submissionBeaconId + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                    icon="res://success.png"                    }
                else {
                    title = "잘못된 위치에서 체크시트 제출"
                    description = alarm.submissionBeaconId + " 근처에서 " + alarm.properBeaconId + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                    icon="res://warning.png"
                }
            }
            else if(alarm.type == "warning") {
                title = "위험"
                description = alarm.beaconId + " 위치의 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요" 
                icon="res://danger.png"
            }
            else if(alarm.type == "attendance") {
                title= "출석 확인"
                description = alarm.session + " 출석 확인"
                icon="res://success.png"
            }
            else if(alarm.type == "battery") {
                title="비콘 배터리 잔량 부족"
                description = alarm.line+ " " + alarm.beaconId + " 위치 " + 
                alarm.equipment + " 비콘 배터리 잔량이 " + alarm.battery + 
                "%입니다. 점검해주세요."
                icon="res://danger.png"
            }
            item["id"] = alarm.id
            item["title"] = title
            item["text"] = description
            item["icon"] = icon
            item["foreground"] = true
            items.push(item)
        })
      }
       // 이제 알람 띄움
       if(items){
       cordova.plugins.notification.local.schedule(items)
       cordova.plugins.notification.local.on('click', function(notification) {
           // console.log(notification)
           window.location = "file:///android_asset/www/template/alarm/alarmdetail.html" + "?id=" + notification.id ;
       })
      }
          this.beaconList = {}
      })
      .catch((error) => {
      console.error(error)
      })
    }, 3000);
   },

   stopScan: function() {
    this.bleManager.stopScan()
    },
<<<<<<< HEAD

   startScan: function() {
     if(this.isBlePoweredOn === true) {
        this.bleManager.setBackgroundBetweenScanPeriod(0)
        this.bleManager.setBackgroundScanPeriod(2000)
        this.bleManager.setForegroundBetweenScanPeriod(0)
        this.bleManager.setForegroundScanPeriod(2000)
        this.bleManager.updateScanPeriod()
        this.bleManager.startScan()
     }
     else {
        alert('블루투스 기능이 꺼져 있습니다.')
     }
   },

   sendBeacon: function() {
    if(this.isBlePoweredOn === true) {
      let userInfo = window.localStorage.getItem("userInfo");
      // console.log(JSON.parse(userInfo));
      userInfo = JSON.parse(userInfo);
      const userID = userInfo.data.userId;
       setInterval(() => {
         fetch(`http://k4b101.p.ssafy.io/api/beacon/scaninfo/${userID}`, {
           method:'POST',
           headers: {
            'Content-Type': 'application/json',
            // Accept: 'application/json',
          },
           body: JSON.stringify(beaconList),
          //  body: beaconList,
         })
         .then((response) => {
             return response.json();
         })
         .then((result) => {
<<<<<<< HEAD
          alarmlist = result.data
          let items = []
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
                  if(alarm.properBeaconId == alarm.submissionBeaconId) {
                      // 잘 제출 한 경우
                      title = "체크시트 제출 확인"
                      description = alarm.submissionBeaconId + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                      icon="res://success.png"                    }
                  else {
                      title = "잘못된 위치에서 체크시트 제출"
                      description = alarm.submissionBeaconId + " 근처에서 " + alarm.properBeaconId + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                      icon="res://warning.png"
                  }
              }
              else if(alarm.type == "warning") {
                  title = "위험"
                  description = alarm.beaconId + " 위치의 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요" 
                  icon="res://danger.png"
              }
              else if(alarm.type == "attendance") {
                  title= "출석 확인"
                  description = alarm.session + " 출석 확인"
                  icon="res://success.png"
              }
              else if(alarm.type == "battery") {
                  title="비콘 배터리 잔량 부족"
                  description = alarm.line+ " " + alarm.beaconId + " 위치 " + 
                  alarm.equipment + " 비콘 배터리 잔량이 " + alarm.battery + 
                  "%입니다. 점검해주세요."
                  icon="res://danger.png"
              }
              item["id"] = alarm.id
              item["title"] = title
              item["text"] = description
              item["icon"] = icon
              item["foreground"] = true
              items.push(item)
          })
          // 이제 알람 띄움
          cordova.plugins.notification.local.schedule(items)
          cordova.plugins.notification.local.on('click', function(notification) {
              // console.log(notification)
              window.location = "file:///android_asset/www/template/alarm/alarmdetail.html" + "?id=" + notification.id ;
          })
=======
             console.log(result)
>>>>>>> e75e40992f2151197b124ef0df07b3dd5d3a02d7
             this.beaconList = {}
         })
         .catch((error) => {
         console.error(error)
         })
       }, 10000);
    }
    else {
       alert('블루투스 기능이 꺼져 있습니다.')
    }
  },

  eduCheckAttendance: function() {
    if(this.isBlePoweredOn === true) {
      this.bleManager.setBackgroundBetweenScanPeriod(0)
      this.bleManager.setBackgroundScanPeriod(2000)
      this.bleManager.setForegroundBetweenScanPeriod(0)
      this.bleManager.setForegroundScanPeriod(2000)
      this.bleManager.updateScanPeriod()
      this.bleManager.startScan()
      setInterval(() => {
        console.log(beaconList);
        beaconList = []
        // fetch('http://k4b101.p.ssafy.io/api/test/2000', {
        //   method:'POST',
      //     body: JSON.stringify(this.beaconList),
      //   })
      //   .then((response) => {
      //       return response.json();
      //   })
      //   .then((result) => {
      //       console.log(result)
      //       this.beaconList = {}
      //   })
      //   .catch((error) => {
      //   console.error(error)
      //   })
      }, 4000);
   }
   else {
      alert('블루투스 기능이 꺼져 있습니다.')
   }
  },

    callBeaconListDB: function() {
      fetch('http://k4b101.p.ssafy.io/api/beacon/', {
        method: 'GET',
      })
      .then((response) => {
          return response.json();
      })
      .then((result) => {
          this.beaconListDB = state === result.data
      })
      .catch((error) => {
          console.error(error)
      })
    },
};


app.initialize()
window.app = app // 디버그 용
=======

   sendBeacon: function() {
    if(this.isBlePoweredOn === true) {
       this.bleManager.setBackgroundBetweenScanPeriod(0)
       this.bleManager.setBackgroundScanPeriod(2000)
       this.bleManager.setForegroundBetweenScanPeriod(0)
       this.bleManager.setForegroundScanPeriod(2000)
       this.bleManager.updateScanPeriod()
       this.bleManager.startScan()
       user_name = document.getElementById("username").value
       
       setInterval(() => {
         fetch(`http://k4b101.p.ssafy.io/api/beacon/${user_name}/scan`, {
           method:'POST',
           headers: {
            'Content-Type': 'application/json',
          },
           body: JSON.stringify(beaconList),
         })
         .then((response) => {
             return response.json();
         })
         .then((result) => {
              // 여기다 실시간 알림 로직 넣기
            //   // result에 실시간 알림 정보가 들어온다.
              let alarmlist = result.data;
              let items = []
              // description 만들기
              alarmlist.forEach((alarm) => {
                item = {}
                let title;
                let description;
                if(alarm.type == "takeover") {
                    title = "인수 인계"
                    description = alarm.line+ " " + alarm.equipment+ " " + alarm.description + " - " + alarm.writer
                }
                else if(alarm.type == "checksheet") {
                    if(alarm.properLocation == alarm.submissionLocation) {
                        // 잘 제출 한 경우
                        title = "체크시트 제출 확인"
                        description = alarm.submissionLocation + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                    }
                    else {
                        title = "잘못된 위치에서 체크시트 제출"
                        description = alarm.submissionLocation + " 위치에서 " + alarm.properLocation + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                    }
                }
                else if(alarm.type == "warning") {
                    title = "위험"
                    description = alarm.location + " 위치의 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요" 
                }
                else if(alarm.type == "attendance") {
                    title= "출석 확인"
                    description = alarm.session + " 출석 확인"
                }
                item["id"] = alarm.id
                item["title"] = title
                item["text"] = description
                items.push(item)
            })
            // 이제 알람 띄움
            cordova.plugins.notification.local.schedule(items)

            //  console.log(result)
             this.beaconList = {}
         })
         .catch((error) => {
         console.error(error)
         })
       }, 3000);
    }
    else {
       alert('블루투스 기능이 꺼져 있습니다.')
    }
  },
};


beaconScan.initialize()
window.beaconScan = beaconScan // 디버그 용
>>>>>>> 6f85f910adca08d8921f4d833010f49a10c33b40
