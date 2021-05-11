const { Manager, Connection } = require('buildthing-ble-sdk')

let beaconList = [];
let user_name = '';

var app = {
   initialize: function() {
     this.bleManager = null
     this.isBlePoweredOn = false
     this.beaconListDB = null

     this.bindEvents();
   },

   bindEvents: function() {
       document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
       document.getElementById("startScanBtn").addEventListener("click", this.startScan.bind(this))
       document.getElementById("stopScanBtn").addEventListener("click", this.stopScan.bind(this))
       document.getElementById("sendBeaconInfo").addEventListener("click", this.sendBeacon.bind(this))
       document.getElementById("checkAttendance").addEventListener("click", this.eduCheckAttendance.bind(this))

       
       
       document.getElementById("addBeacon").addEventListener("click", this.callBeaconListDB.bind(this))
   },

   onDeviceReady: function() {
    this.bleManager = new Manager()
    this.bleManager.on('stateChange', function (state) {
        console.log(state)
        this.isBlePoweredOn = state === 'poweredOn' // 모바일 디바이스에 블루투스 상태 확인
    }.bind(this))

    // beacon discover
    this.bleManager.on('discover', function(beacon) {

    //   // beacon mode change
    //   if (beacon.mode === 'iBeacon') {
    //     const bleConnection = new Connection(beacon, '0000')
    //     bleConnection.connect()
    //     if (bleConnection.isConnected === true) {
    //       bleConnection.changeMode()
    //     }
    //   }
      // beaconList[beacon.id] = beacon
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
   },

   stopScan: function() {
    this.bleManager.stopScan()
    },

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