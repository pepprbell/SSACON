const { Manager, Connection } = require('buildthing-ble-sdk')

let beaconList = []

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


       document.getElementById("nextPage").addEventListener("click", this.testNextPage.bind(this))


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

  testNextPage: function() {
    window.location = "./template/testrouter/testrouter.html";
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