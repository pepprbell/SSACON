const { Manager, } = require('buildthing-ble-sdk')

let beaconScanList = {};
let beaconListDBfront = [];
let beaconAddInfo = {};

function startScan() {
  bleManager.on('stateChange', function (state) {
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
  })

  bleManager.on('discover', function(beacon) {
    console.log(beacon);
  })
}


const beaconAdd = {
   initialize: function() {
    this.bleManager = null;
    this.beaconListDB = new Array();
    this.bindEvents();
   },

   bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    document.getElementById("beaconBackBtt").addEventListener("click", this.stopScan.bind(this))
    document.getElementById("beaconCreate").addEventListener("click", this.beaconCreate.bind(this))
    document.getElementById("beaconModalClose").addEventListener("click", this.beaconAddModalClose.bind(this))
   },

   onDeviceReady: function() {
    fetch('http://k4b101.p.ssafy.io/api/beacon/list', {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      this.beaconListDB = result.data
    })
    .catch((error) => {
        console.error(error)
    })
    
    this.bleManager = new Manager()

    // 권한(위치, 블루투스) 확인 및 스캔 시작
    this.bleManager.on('stateChange', function (state) {
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
      let today = new Date();
      
      if (this.beaconListDB.includes(beacon.id) || beaconListDBfront.includes(beacon.id)) {
        console.log('이미 등록된 비콘');
      }
      else {
        if (document.getElementById(`${beacon.id}`)) {
          console.log('업데이트');
          updateBeaconCard(beacon)
        } else {
          // 처음 스캔되면 dom create
          console.log('처음추가');
          createNewBeaconCard(beacon)
        }
  
        // 오래동안 upgrade 못하면 dom, object delete 로직
        // for (let key in beaconScanList) {
        //   let calTime = today - beaconScanList[key].scanTime
        //   if (calTime > 15000) {
        //     delete beaconScanList[key];
        //     const el = document.getElementById(`${key}`);
        //     if (el) {
        //       console.log('??');
        //       el.remove();
        //     }
        //   }
        // }

        // 전역변수에 추가
        beaconScanList[beacon.id] = {
          scanTime: today,
          ...beacon
        }
      }
    }.bind(this))
   },

   stopScan: function() {
    this.bleManager.stopScan();
    window.history.back();
   },

   beaconAddModalClose: function(e) {
    const modalClose = document.querySelector('.modal-close')
  
    modalClose.addEventListener('click', function() {
      modalBg.classList.remove('bg-active')
    })

    beaconAddInfo = {};
   },

   beaconCreate: function(e) {
    e.preventdefault()

    // 모든창에 데이터가 잘 나왔는지 확인


    // 여기다가 추가하기
    beaconAddInfo[line] = ''
    beaconAddInfo[equipment] = ''
    beaconAddInfo[beacon_name] = ''
    beaconAddInfo[temperatureMax] = ''
    beaconAddInfo[temperatureMin] = ''
    beaconAddInfo[humidityMax] = ''
    beaconAddInfo[humidityMin] = ''

    

    fetch(`http://k4b101.p.ssafy.io/api/beacon/add/${beacon_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beaconList),
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
        console.error(error)
    })
    beaconListDBfront.push(e.target.value)
    document.getElementById(`${e.target.value}`).remove()
   },
};

function createNewBeaconCard(beacon) {
  let cardContainer = document.createElement("div");

  cardContainer.id = `${beacon.id}`
  cardContainer.className = "beacon_card_body"

  const cardContainerContent = `
    <div class="beacon_img"/>
    <div id="${beacon.id}_rssi" class="beacon_rssi">${beacon.rssi}</div>
    <div id="${beacon.id}_vbatt" class="beacon_vbatt">${beacon.vbatt.percentage.value}%</div>
    <div class="beacon_vbatt_img"/>
    <button class=beacon_add_butt value="${beacon.id}" type="button">비콘 추가</button>
  `;

  cardContainer.innerHTML = cardContainerContent
  cardContainer.addEventListener("click", beaconAddModalOpen);
  document.getElementById("beacon_c_container").appendChild(cardContainer);
}

function updateBeaconCard(beacon) {
  document.getElementById(`${beacon.id}_rssi`).innerText = `${beacon.rssi}`
  document.getElementById(`${beacon.id}_vbatt`).innerText = `${beacon.vbatt.percentage.value}%`
}

function beaconAddModalOpen(e) {
  const modalBtn = document.querySelector('.modal-btt');
  const modalBg = document.querySelector('.modal-bg')

  modalBtn.addEventListener('click', function() {
    modalBg.classList.add('bg-active')
  })

  const info = beaconScanList[e.target.value]

  beaconAddInfo = {
    temperature: info.sensors[0].data.temperature.value || 0,
    humidity: info.sensors[0].data.humidity.value || 0,
    vbatt: info.vbatt.percentage.value
  }
  // beaconAddInfo[temperature] = info.sensors[0].data.temperature.value || 0
  // beaconAddInfo[humidity] = info.sensors[0].data.humidity.value || 0
  // beaconAddInfo[vbatt] = info.vbatt.percentage.value
}


beaconAdd.initialize()
window.beaconAdd = beaconAdd // 디버그 용