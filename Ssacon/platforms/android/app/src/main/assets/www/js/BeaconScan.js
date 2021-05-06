const { Manager, Connection } = require('buildthing-ble-sdk')

const beaconList = {} 

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
       document.getElementById("addBeacon").addEventListener("click", this.callBeaconListDB.bind(this))
      //  document.getElementById("addBeacon").addEventListener("click", this.createBeaconForm.bind(this))
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
      beaconList[beacon.id] = beacon
      console.log(beaconList);
    })
   },

   startScan: function() {
     if(this.isBlePoweredOn === true) {
        this.bleManager.setBackgroundBetweenScanPeriod(3000)
        this.bleManager.setBackgroundScanPeriod(3000)
        this.bleManager.setForegroundBetweenScanPeriod(3000)
        this.bleManager.setForegroundScanPeriod(3000)
        this.bleManager.updateScanPeriod()
        this.bleManager.startScan()
        // createBeaconForm();
     }
     else {
        alert('블루투스 기능이 꺼져 있습니다.')
     }
   },

   stopScan: function() {
     this.bleManager.stopScan()
   },

    createBeaconForm: function() {
      return 0
    },

    callBeaconListDB: function() {
      fetch('http://k4b101.p.ssafy.io/api/beacon/', {method:'GET',})
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