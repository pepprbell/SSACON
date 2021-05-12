const { Manager, Connection } = require('buildthing-ble-sdk')

let beaconScanList = {};
let beaconListDBfront = [];
let beaconAddInfo = null;
let beaconUpdateInfo = null;
let beaconAllInfo = [];
let lineEquipment = {line1: ['e1', 'e2', 'e3'], line2: ['e3', 'e4', 'e5'],};

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
      beaconListDBfront = result.data.beacon_id
      beaconAllInfo = result.data.beacon_info
      lineEquipment = result.data.line_equipment
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
        createNewBeaconCard(beacon)
      }

      // 오래동안 upgrade 못하면 dom, object delete 로직
      for (let key in beaconScanList) {
        let calTime = today - beaconScanList[key].scanTime
        if (calTime > 15000) {
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

  // beaconAddModalOpen: function (e) {
    
  // },
  
  // beaconUpdateModalOpen: function (e) {
    
  // },

   beaconAddModalClose: function() {
    document.getElementById('modal_container').remove();
    beaconAddInfo = null;
    beaconUpdateInfo = null;
    this.bleManager.startScan()
   },

   beaconCreate: function(e) {
    console.log(e);
    e.preventdefault()

    const values = {
      beacon_id: beaconAddInfo.id,
      line : document.getElementById('beacon_line').value || null,
      equipment: document.getElementById('beacon_equipment').value || null,
      temperatureMin: (document.getElementById('beacon_temperatureMin').value * 0.1) || null,
      temperatureMax: (document.getElementById('beacon_temperatureMax').value * 0.1) || null,
      humidityMin: (document.getElementById('beacon_humidityMin').value * 0.1) || null,
      humidityMax: (document.getElementById('beacon_humidityMax').value * 0.1) || null,
      signalPower: document.getElementById('beacon_signalPower').value || null,
      sensing: document.getElementById('beacon_sensing').value || null,
      adv: document.getElementById('beacon_adv').value || null,
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
      alert('센싱 주기를 다시 확인해 주세요')
      return
    } else if (!values.adv) {
      alert('Advertising 주기를 다시 확인해 주세요')
      return
    } else if ((values.temperatureMax - values.temperatureMin) < 0) {
      alert('온도 최소 범위를 다시 확인해 주세요')
      return
    } else if ((values.humidityMax - values.humidityMin) < 0) {
      alert('온도 최소 범위를 다시 확인해 주세요')
      return
    } else if (values.signalPower < 2) {
      alert('센싱 주기의 최소 값은 2sec 입니다.')
      return
    } else if (values.adv < 1) {
      alert('Advertising 주기의 최소 값은 1sec 입니다.')
      return
    }

    // Connection
    console.log(beaconAddInfo);
    var connection = new Connection(beaconAddInfo);
    const TxPower = [false, -20, -16, -12, -8, -4, 0, 4]

    connection.on('connect', async function (beacon) {
      // await connection.changeMode('' + BeaconModeValue[changedBeaconMode])
      await connection.changeName(values.line + '-' + values.temperatureMin)
      await connection.changeTxPower(TxPower.indexOf(values.signalPower))
      await connection.changeSensorInterval(values.sensing)
      await connection.changeAdvertisingInterval(values.adv * 100)
      connection.disconnect() // mode 변경 요청 이후, 연결 해제 (연결이 해제 되어야만 다시 스캔이 됩니다.)
    })
    
    fetch(`http://k4b101.p.ssafy.io/api/beacon/delete/${beaconAddInfo.id}`, {
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
      console.log(result);
      beaconListDBfront.push(values.beacon_id)
      beaconAllInfo.push(values)
      document.getElementById(`${values.beacon_id}`).remove()
      document.getElementById('modal_container').remove();
      beaconAddInfo = null;
      beaconUpdateInfo = null;
      this.bleManager.startScan()
    })
    .catch((error) => {
      console.error(error)
    })
  },

  beaconDelete: function () {
    fetch(`http://k4b101.p.ssafy.io/api/beacon/add/${beaconAddInfo.id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      beaconListDBfront = result.data.beacon_id
      beaconAllInfo = result.data.beacon_info
      document.getElementById(`${values.beacon_id}`).remove()
      document.getElementById('modal_container').remove();
      beaconAddInfo = null;
      beaconUpdateInfo = null;
      this.bleManager.startScan()
    })
    .catch((error) => {
      console.error(error)
    })
  },
};




function createNewBeaconCard(beacon) {
  let cardContainer = document.createElement("div");

  cardContainer.id = `${beacon.id}`
  cardContainer.className = "beacon_card_body"

  const cardContainerContentCreate = `
    <div class="beacon_card_body">
      <div class="top">
        <div class="left">
          <div class="beacon_img"></div>
          <img src="../../../image/beacon_logo.jpg" alt="비콘이미지">
        </div>

        <div class="center">
          <div id"${beacon.id}_name" class="beacon_title">${beacon.name}</div>
          <div>
            <span class="beacon_opthion_name">RSSI</span>
            <span id="${beacon.id}_rssi" class="beacon_opthion_value">${beacon.rssi}dBm</span>
          </div>
          <div>
            <span class="beacon_opthion_name">Adv. 주기</span>
            <span id="${beacon.id}_advertising" class="beacon_opthion_value">${beacon.intervalOfAdvertising / 10}sec</span>
          </div>
          <div>
            <span class="beacon_opthion_name">센싱 주기</span>
            <span id="${beacon.id}_sensing" class="beacon_opthion_value">${beacon.intervalOfSensing}sec</span>
          </div>
        </div>

        <div class="right">
          <div id="${beacon.id}_vbatt" class="beacon_vbatt">90%</div>
        </div>
      </div>
      <div class="bottom">
        <div class=beacon_add_butt value="${beacon.id}">비콘 추가</div>
      </div>
    </div>
  `;

  const cardContainerContentUpdate = `
    <div class="beacon_card_body">
      <div class="top">
        <div class="left">
          <div class="beacon_img"></div>
          <img src="../../../image/beacon_logo.jpg" alt="비콘이미지">
        </div>

        <div class="center">
          <div class="beacon_title">${beacon.name}</div>
          <div>
            <span class="beacon_opthion_name">RSSI</span>
            <span id="${beacon.id}_rssi" class="beacon_opthion_value">${beacon.rssi}dBm</span>
          </div>
          <div>
            <span class="beacon_opthion_name">Adv. 주기</span>
            <span id="${beacon.id}_advertising" class="beacon_opthion_value">${beacon.intervalOfAdvertising / 10}sec</span>
          </div>
          <div>
            <span class="beacon_opthion_name">센싱 주기</span>
            <span id="${beacon.id}_sensing" class="beacon_opthion_value">${beacon.intervalOfSensing}sec</span>
          </div>
        </div>

        <div class="right">
          <div id="${beacon.id}_vbatt" class="beacon_vbatt">90%</div>
        </div>
      </div>
      <div class="bottom">
        <div class=beacon_update_butt value="${beacon.id}">비콘 수정</div>
      </div>
    </div>
  `

  if (beaconListDBfront.includes(beacon.id)) {
    cardContainer.innerHTML = cardContainerContentUpdate
    cardContainer.addEventListener("click", beaconUpdateModalOpen());
    document.getElementById("beacon_c_container").appendChild(cardContainer);
  } else {
    cardContainer.innerHTML = cardContainerContentCreate
    cardContainer.addEventListener("click", beaconAddModalOpen());
    document.getElementById("beacon_c_container").appendChild(cardContainer);
  }
}

function updateBeaconCard(beacon) {
  const new_adv = beacon.intervalOfAdvertising / 10
  document.getElementById(`${beacon.id}_name`).innerText = `${beacon.name}`
  document.getElementById(`${beacon.id}_rssi`).innerText = `${beacon.rssi}`
  document.getElementById(`${beacon.id}_advertising`).innerText = `${new_adv}`
  document.getElementById(`${beacon.id}_sensing`).innerText = `${beacon.intervalOfSensing}`
  document.getElementById(`${beacon.id}_vbatt`).innerText = `${beacon.vbatt.percentage.value}%`
}

function beaconAddModalOpen(e) {
  beaconAdd.onlyStopScan()

  let connection_beacon = beaconScanList[e.target.value];
  delete connection_beacon[scanTime];
  beaconAddInfo = connection_beacon

  const body = document.querySelector('modal_body')

  const modal = `
    <div class="modal-bg bg-active" id="modal_container">
      <div class="modal">

        <div class="wrapper">
          <div  class="input-data">
            <div class="two-ele">
              <label for="line">라인</label>
              <span>* 필수항목</span>
            </div>
            <select name="line" id="beacon_line">
              <option value="nothing">----------</option>
              <option value="${Object.keys(lineEquipment)[0]}">${Object.keys(lineEquipment)[0]}</option>
              <option value="${Object.keys(lineEquipment)[1]}">${Object.keys(lineEquipment)[1]}</option>
            </select>
          </div>
        </div>
        
        <div class="wrapper">
          <div  class="input-data">
            <div class="two-ele">
              <label for="equipment">설비</label>
              <span>* 필수항목</span>
            </div>
            <select name="equipment" id="beacon_equipment">
              <option value="">----------</option>
            </select>
          </div>
        </div>
        
        <div class="wrapper">
          <div  class="input-data">
            <div class="two-ele">
              <label for="temperature">온도 범위</label>
              <span>* 필수항목</span>
            </div>
            <input id="beacon_temperatureMin" type="number" name="temperatureMin" class="towInput">
            <span>~</span>
            <input id="beacon_temperatureMax" type="number" name="temperatureMax" class="towInput">
          </div>
        </div>

        <div class="wrapper">
          <div  class="input-data">
            <div class="two-ele">
              <label for="humidity">습도 범위</label>
              <span>* 필수항목</span>
            </div>
            <input id="beacon_humidityMin" type="number" name="humidityMin" class="towInput">
            <span> ~ </span>
            <input id="beacon_humidityMax" type="number" name="humidityMax" class="towInput">
          </div>
        </div>
        
        <div class="wrapper">
          <div  class="input-data">
            <div class="two-ele">
              <label for="signalPower">신호 세기</label>
              <span>단위:dbm</span>
            </div>
            <input id="beacon_signalPower" type="number" name="signalPower" class="input">
            <div class="underline"></div>
          </div>
        </div>

        <div class="wrapper">
          <div  class="input-data">
            <div class="two-ele">
              <label for="sensing">센싱 주기</label>
              <span>단위:sec</span>
            </div>
            
            <input id="beacon_sensing" type="number" name="sensing" class="input">
            <div class="underline"></div>
          </div>
        </div>

        <div class="wrapper">
          <div  class="input-data">
            <div class="two-ele">
              <label for="adv">Adv. 주기</label>
              <span>단위:sec</span>
            </div>
            <input id="beacon_adv" type="number" name="adv" class="input">
            <div class="underline"></div>
          </div>
        </div>

        <button class="beaconUpdate">추가하기</button>

        <span id="beaconModalClose" class="modal-close">x</span>
      </div>
    </div>
  `

  body.innerHTML = modal
  document.querySelector('.beaconCreate').addEventListener("click", beaconAdd.beaconCreate());
  document.getElementById('beacon_line').addEventListener("change", line_option);

}

function beaconUpdateModalOpen(e) {
  beaconAdd.onlyStopScan()

  let connection_beacon = beaconScanList[e.target.value];
  delete connection_beacon[scanTime];
  beaconAddInfo = connection_beacon

  const body = document.querySelector('modal_body')

  for (let i = 0; i < beaconAllInfo.length; i++) {
    if (beaconAllInfo[i].beacon_id === e.target.value) {

      const modal = `
        <div class="modal-bg bg-active" id="modal_container">
          <div class="modal">

            <div class="wrapper">
              <div  class="input-data">
                <div class="two-ele">
                  <label for="line">라인</label>
                  <span>* 필수항목</span>
                </div>
                <select name="line" id="beacon_line">
                  <option value="nothing">----------</option>
                  <option value="${Object.keys(lineEquipment)[0]}">${Object.keys(lineEquipment)[0]}</option>
                  <option value="${Object.keys(lineEquipment)[1]}">${Object.keys(lineEquipment)[1]}</option>
                </select>
              </div>
            </div>
            
            <div class="wrapper">
              <div  class="input-data">
                <div class="two-ele">
                  <label for="equipment">설비</label>
                  <span>* 필수항목</span>
                </div>
                <select name="equipment" id="beacon_equipment">
                  <option value="">----------</option>
                </select>
              </div>
            </div>
            
            <div class="wrapper">
              <div  class="input-data">
                <div class="two-ele">
                  <label for="temperature">온도 범위</label>
                  <span>* 필수항목</span>
                </div>
                <input id="beacon_temperatureMin" type="number" name="temperatureMin" class="towInput" value="${beaconAllInfo[i].temperatureMax}">
                <span>~</span>
                <input id="beacon_temperatureMax" type="number" name="temperatureMax" class="towInput" value="${beaconAllInfo[i].temperatureMin}">
              </div>
            </div>

            <div class="wrapper">
              <div  class="input-data">
                <div class="two-ele">
                  <label for="humidity">습도 범위</label>
                  <span>* 필수항목</span>
                </div>
                <input id="beacon_humidityMin" type="number" name="humidityMin" class="towInput" value="${beaconAllInfo[i].humidityMax}">
                <span> ~ </span>
                <input id="beacon_humidityMax" type="number" name="humidityMax" class="towInput" value="${beaconAllInfo[i].humidityMin}">
              </div>
            </div>
            
            <div class="wrapper">
              <div  class="input-data">
                <div class="two-ele">
                  <label for="signalPower">신호 세기</label>
                  <span>단위:dbm</span>
                </div>
                <input id="beacon_signalPower" type="number" name="signalPower" class="input" value="${beaconAllInfo[i].signalPower}">
                <div class="underline"></div>
              </div>
            </div>

            <div class="wrapper">
              <div  class="input-data">
                <div class="two-ele">
                  <label for="sensing">센싱 주기</label>
                  <span>단위:sec</span>
                </div>
                
                <input id="beacon_sensing" type="number" name="sensing" class="input" value="${beaconAllInfo[i].sensing}">
                <div class="underline"></div>
              </div>
            </div>

            <div class="wrapper">
              <div  class="input-data">
                <div class="two-ele">
                  <label for="adv">Adv. 주기</label>
                  <span>단위:sec</span>
                </div>
                <input id="beacon_adv" type="number" name="adv" class="input" value="${beaconAllInfo[i].adv}">
                <div class="underline"></div>
              </div>
            </div>

            <button class="beaconUpdate">추가하기</button>

            <span id="beaconModalClose" class="modal-close">x</span>
          </div>
        </div>
      `

      body.innerHTML = modal
      document.querySelector('.beaconUpdate').addEventListener("click", beaconAdd.beaconCreate());
      document.querySelector('.beaconDelete').addEventListener("click", beaconAdd.beaconDelete());
      document.getElementById('beacon_line').addEventListener("change", line_option);
      break
    }
  }
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