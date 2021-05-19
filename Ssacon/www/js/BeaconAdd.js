const { Manager, Connection } = require('buildthing-ble-sdk')

let beaconScanList = {};
let beaconListDBfront = [];
let beaconAddInfo = null;
let beaconUpdateInfo = null;
let beaconAllInfo = {};
let lineEquipment = {};

var beaconAdd = {
   initialize: function() {
    this.bleManager = null;
    this.beaconListDB = new Array();
    this.bindEvents();
   },

   bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    document.getElementById("beaconBackBtt").addEventListener("click", this.stopScan.bind(this))
    document.getElementById("cu_btn").addEventListener("click", this.beaconCreate.bind(this))
    document.getElementById("d_btn").addEventListener("click", this.beaconDelete.bind(this))
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
      console.log(result.data);
      beaconListDBfront = result.data.beacon_id
      lineEquipment = result.data.line_equipment
      const beaconDB = result.data.beacon_info
      beaconDB.forEach(e => {
        beaconAllInfo[e.beacon_id] = e
      });
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
      
      if (document.getElementById(`${beacon.id}`)) {
        console.log('업데이트');
        updateBeaconCard(beacon)
      } else {
        // 처음 스캔되면 dom create
        console.log('처음추가');
        if (beaconAllInfo[beacon.id]) {
          createNewBeaconCard(beacon, beaconAllInfo[beacon.id].equipment)
        } else {
          createNewBeaconCard(beacon, '')
        }
      }

      // 오래동안 upgrade 못하면 dom, object delete 로직
      for (let key in beaconScanList) {
        let calTime = today - beaconScanList[key].scanTime
        if (calTime > 30000) {
          delete beaconScanList[key];
          const el = document.getElementById(`${key}`);
          if (el) {
            console.log('??');
            el.remove();
          }
        }
      }

      // 전역변수에 추가
      beaconScanList[beacon.id] = {
        scanTime: today,
        ...beacon
      }
    }.bind(this))
   },

   stopScan: function() {
    this.bleManager.stopScan();
    window.history.back();
   },

   onlyStopScan: function() {
    this.bleManager.stopScan();
   },

   beaconAddModalClose: function() {
    const btn = document.getElementById('cu_btn');
    btn.className = 'nothing'
    beaconAddInfo = null;
    beaconUpdateInfo = null;

    // modal close
    const modalBg = document.querySelector('.modal-bg')
    modalBg.classList.remove('bg-active')
    document.querySelector('.modal_body').classList.remove('modal_body_hide')
    this.bleManager.startScan()
   },

   beaconCreate: function(e) {
    // console.log(e);
    // e.preventdefault()
    const className = document.getElementById('cu_btn').className
    const line_id = document.getElementById('beacon_line')
    const equipment_id = document.getElementById('beacon_equipment')
    const signalPower_id = document.getElementById('beacon_signalPower')

    const values = {
      beacon_id: beaconAddInfo.id,
      line : line_id.options[line_id.selectedIndex].value || null,
      equipment: equipment_id.options[equipment_id.selectedIndex].value || null,
      temperatureMin: (document.getElementById('beacon_temperatureMin').value * 1.0) || null,
      temperatureMax: (document.getElementById('beacon_temperatureMax').value * 1.0) || null,
      humidityMin: (document.getElementById('beacon_humidityMin').value * 1.0) || null,
      humidityMax: (document.getElementById('beacon_humidityMax').value * 1.0) || null,
      signalPower: signalPower_id.options[signalPower_id.selectedIndex].value,
      sensing: document.getElementById('beacon_sensing').value || null,
    }

    // 모든창에 데이터가 잘 나왔는지 확인
    if (!values.line) {
      alert('라인을 다시 확인해 주세요')
      return
    } else if (!values.equipment) {
      alert('설비를 다시 확인해 주세요')
      return
    } else if (!values.temperatureMin) {
      alert('온도 최소 범위를 다시 확인해 주세요')
      return
    } else if (!values.temperatureMax) {
      alert('온도 최대 범위를 다시 확인해 주세요')
      return
    } else if (!values.humidityMin) {
      alert('습도 최소 범위를 다시 확인해 주세요')
      return
    } else if (!values.humidityMax) {
      alert('습도 최대 범위를 다시 확인해 주세요')
      return
    } else if (!values.signalPower) {
      alert('신호 세기를 다시 확인해 주세요')
      return
    } else if (!values.sensing) {
      alert('신호 주기를 다시 확인해 주세요')
      return
    } else if ((values.temperatureMax - values.temperatureMin) < 0) {
      alert('온도 최소 범위를 다시 확인해 주세요')
      return
    } else if ((values.humidityMax - values.humidityMin) < 0) {
      alert('온도 최소 범위를 다시 확인해 주세요')
      return
    } else if (values.sensing < 2) {
      alert('신호 주기의 최소 값은 2sec 입니다.')
      return
    } 

    // Connection
    const TxPower = [false, '-20', '-16', '-12', '-8', '-4', '0', '4']
    var connection = new Connection(beaconAddInfo);
    console.log(connection || null);
    connection.connect()
    connection.on('connect', async function (beaconAddInfo) {
      // document.querySelector('.loading_bg').classList.remove('no_loading_bg')
      // await connection.changeName(values.equipment)
      await connection.changeTxPower(TxPower.indexOf(values.signalPower))
      await connection.changeSensorInterval(values.sensing)
      await connection.disconnect() // mode 변경 요청 이후, 연결 해제 (연결이 해제 되어야만 다시 스캔이 됩니다.)
    
      if (className === 'beaconCreateBtn') {
        fetch(`http://k4b101.p.ssafy.io/api/beacon/add/${beaconAddInfo.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result.data);
          beaconListDBfront.push(values.beacon_id)
          beaconAllInfo[values.beacon_id] = values
          // document.getElementById(`${values.beacon_id}`).remove()
          const btn = document.getElementById('cu_btn');
          btn.className = 'nothing'
          beaconAddInfo = null;
          document.querySelector('.modal-bg').classList.remove('bg-active')
          document.querySelector('.modal_body').classList.remove('modal_body_hide')
        })
        .catch((error) => {
          console.error(error)
        })
      } else {
        fetch(`http://k4b101.p.ssafy.io/api/beacon/update/${beaconAddInfo.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result.data);
          beaconAllInfo[values.beacon_id] = values
          const btn = document.getElementById('cu_btn');
          btn.className = 'nothing'
          beaconAddInfo = null;
          // 모달끄기
          document.querySelector('.modal-bg').classList.remove('bg-active')
          document.querySelector('.modal_body').classList.remove('modal_body_hide')
        })
        .catch((error) => {
          console.error(error)
        })
      }
    })
    connection.on('disconnect', function (beaconAddInfo, isTimeout, errorMessage) {
      console.log('disconnect', isTimeout, errorMessage)
      console.log('isConnected', connection.isConnected)
    })
    // document.querySelector('.loading_bg').classList.add('no_loading_bg')
    document.getElementById('beacon_c_container').innerHTML = ''
    this.bleManager.startScan()
  },

  beaconDelete: function () {
    fetch(`http://k4b101.p.ssafy.io/api/beacon/delete/${beaconAddInfo.id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result.data);
      beaconListDBfront = result.data.beacon_id
      const beaconDB = result.data.beacon_info
      beaconDB.forEach(e => {
        beaconAllInfo[e.beacon_id] = e
      });
      beaconAddInfo = null;
      beaconUpdateInfo = null;
      document.querySelector('.modal-bg').classList.remove('bg-active')
      document.querySelector('.modal_body').classList.remove('modal_body_hide')
    })
    .catch((error) => {
      console.error(error)
    })
    document.getElementById('beacon_c_container').innerHTML = ''
    this.bleManager.startScan()
  },
};




function createNewBeaconCard(beacon, beaconName) {
  let cardContainer = document.createElement("div");

  cardContainer.id = `${beacon.id}`
  cardContainer.className = "beacon_card_body"

  const cardContainerContentCreate = `
      <div class="top">
        <div class="left">
          <img class="beacon_img"  src="file:///android_asset/www/image/beacon.png" alt="비콘이미지">
        </div>

        <div class="center">
          <div id="${beacon.id}name" class="beacon_title">Undefined</div>
          <div>
            <span class="beacon_opthion_name">신호 RSSI</span>
            <span id="${beacon.id}_rssi" class="beacon_opthion_value">${beacon.rssi}dBm</span>
          </div>
          <div>
            <span class="beacon_opthion_name">신호 주기</span>
            <span id="${beacon.id}_advertising" class="beacon_opthion_value">${beacon.intervalOfAdvertising.value / 10}sec</span>
          </div>
          <div>
            <span class="beacon_opthion_name">비콘 주기</span>
            <span id="${beacon.id}_sensing" class="beacon_opthion_value">${beacon.intervalOfSensing.value}sec</span>
          </div>
          <br>
        </div>

        <div class="right">
          <div class="batteryContainer">
            <div class="batteryOuter">
              <div id="batteryLevel" style="width: ${Math.round(beacon.vbatt.percentage.value)}%;"></div>
            </div>
            <div class="batteryBump"></div>
          </div>
          <div id="${beacon.id}_vbatt" class="beacon_vbatt">${Math.round(beacon.vbatt.percentage.value)}%</div>
        </div>
      </div>
      <div class="bottom">
        <button type="button" class=beacon_add_butt value="${beacon.id}">비콘 추가</button>
      </div>
  `;

  const cardContainerContentUpdate = `
      <div class="top">
        <div class="left">
          <img class="beacon_img"  src="file:///android_asset/www/image/beacon.png" alt="비콘이미지">
        </div>

        <div class="center">
          <div id="${beacon.id}name" class="beacon_title">${beaconName}</div>
          <div>
            <span class="beacon_opthion_name">RSSI</span>
            <span id="${beacon.id}_rssi" class="beacon_opthion_value">${beacon.rssi}dBm</span>
          </div>
          <div>
            <span class="beacon_opthion_name">Adv. 주기</span>
            <span id="${beacon.id}_advertising" class="beacon_opthion_value">${beacon.intervalOfAdvertising.value / 10}sec</span>
          </div>
          <div>
            <span class="beacon_opthion_name">센싱 주기</span>
            <span id="${beacon.id}_sensing" class="beacon_opthion_value">${beacon.intervalOfSensing.value}sec</span>
          </div>
          <br>
        </div>

        <div class="right">
          <div class="batteryContainer">
            <div class="batteryOuter">
              <div id="batteryLevel" style="width: ${Math.round(beacon.vbatt.percentage.value)}%;"></div>
            </div>
            <div class="batteryBump"></div>
          </div>
          <div id="${beacon.id}_vbatt" class="beacon_vbatt">${Math.round(beacon.vbatt.percentage.value)}%</div>
        </div>
      </div>
      <div class="bottom">
        <button type="button" class=beacon_update_butt value="${beacon.id}">비콘 수정</button>
      </div>
  `

  if (beaconListDBfront.includes(beacon.id)) {
    cardContainer.innerHTML = cardContainerContentUpdate
    cardContainer.addEventListener("click", beaconUpdateModalOpen);
    document.getElementById("beacon_c_container").appendChild(cardContainer);
  } else {
    cardContainer.innerHTML = cardContainerContentCreate
    cardContainer.addEventListener("click", beaconAddModalOpen);
    document.getElementById("beacon_c_container").appendChild(cardContainer);
  }
}

function updateBeaconCard(beacon) {
  document.getElementById(`${beacon.id}_rssi`).innerText = `${beacon.rssi}dBm`
  document.getElementById(`${beacon.id}_sensing`).innerText = `${beacon.intervalOfSensing.value}sec`
  document.getElementById(`${beacon.id}_vbatt`).innerText = `${Math.round(beacon.vbatt.percentage.value)}%`
}

function beaconAddModalOpen(e) {
  console.log(e.target.value);
  beaconAdd.onlyStopScan()

  let connection_beacon = beaconScanList[e.target.value];
  console.log('connection_beacon', connection_beacon);
  delete connection_beacon.scanTime;  
  beaconAddInfo = connection_beacon

  //설비 넣기
  let line = `<option value="">----------</option>`;
  for (key in lineEquipment) {
    line += `<option value="${key}">${key}</option>`
  }
  document.getElementById('beacon_line').innerHTML = line

  // line-equ 관계연결
  const linequ = document.getElementById('beacon_line')
  linequ.addEventListener("change", line_option);

  // create button
  const cubtn = document.getElementById('cu_btn')
  cubtn.className = 'beaconCreateBtn'
  cubtn.innerText = '추가하기'
  document.getElementById('d_btn').style.display = 'none'

  // modal open
  const modalBtn = document.querySelector('.modal-bg');
  modalBtn.classList.add('bg-active');
  document.querySelector('.modal_body').classList.add('modal_body_hide')
}

function beaconUpdateModalOpen(e) {
  console.log(e.target.value);
  beaconAdd.onlyStopScan()

  let connection_beacon = beaconScanList[e.target.value];
  console.log(connection_beacon);
  delete connection_beacon.scanTime; 
  beaconAddInfo = connection_beacon

  const values = {
    beacon_id: beaconAllInfo[e.target.value].beacon_id,
    line: beaconAllInfo[e.target.value].line,
    equipment: beaconAllInfo[e.target.value].equipment,
    temperatureMin: beaconAllInfo[e.target.value].temperatureMin,
    temperatureMax: beaconAllInfo[e.target.value].temperatureMax,
    humidityMin: beaconAllInfo[e.target.value].humidityMin,
    humidityMax: beaconAllInfo[e.target.value].humidityMax,
    signalPower: beaconAllInfo[e.target.value].signalPower,
    sensing: beaconAllInfo[e.target.value].sensing,
  }
  //설비, 라인 넣기
  let line = `<option value="">----------</option>`;
  let equipment = `<option value="">----------</option>`;
  for (key in lineEquipment) {
    if (key === values.line) {
      line += `<option value="${key}" selected>${key}</option>`
      lineEquipment[key].forEach(e => {
        if (e === values.equipment) {
          equipment += `<option value="${e}" selected>${e}</option>`
        } else {
          equipment += `<option value="${e}">${e}</option>`
        }
      })
    } else {
      line += `<option value="${key}">${key}</option>`
    }
  }
  document.getElementById('beacon_line').innerHTML = line
  document.getElementById('beacon_equipment').innerHTML = equipment
  //신호 세기 넣기
  // var signalpower = document.getElementById("beacon_signalPower");
  // for(var i=0; i<signalpower.length; i++){
  //   if(signalpower[i].value === values.signalPower) {
  //     signalpower[i].selected = true;
  //   }
  //   else {
  //     signalpower[i].selected = false;
  //   }
  // }
  // 온도 범위 넣기
  document.getElementById('beacon_temperatureMin').value = values.temperatureMin
  document.getElementById('beacon_temperatureMax').value = values.temperatureMax
  // 습도 범위 넣기
  document.getElementById('beacon_humidityMin').value = values.humidityMin
  document.getElementById('beacon_humidityMax').value = values.humidityMax
  // 신호 주기 넣기
  document.getElementById('beacon_sensing').value = values.sensing

  // line-equ 관계연결
  const linequ = document.getElementById('beacon_line')
  linequ.addEventListener("change", line_option);

  // Update Btn
  const cubtn = document.getElementById('cu_btn')
  cubtn.className = 'beaconUpdateBtn'
  cubtn.innerText = '수정'
  document.getElementById('d_btn').style.display = 'inline-block'

  // modal open
  const modalBtn = document.querySelector('.modal-bg');
  modalBtn.classList.add('bg-active');
  document.querySelector('.modal_body').classList.add('modal_body_hide')

}

function line_option() {
  const line = document.getElementById('beacon_line')
  const option = line.options[line.selectedIndex].value;
  const new_options = lineEquipment[option]
  const line2 = document.getElementById('beacon_equipment')
  let options = ``
  new_options.forEach(e => {
    options += `<option value="${e}">${e}</option>`
  });

  line2.innerHTML = options
}


beaconAdd.initialize()
window.beaconAdd = beaconAdd // 디버그 용