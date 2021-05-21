document.getElementById("closeMessage").addEventListener("click", closeModal)
document.getElementById("seeAll").addEventListener("click", seeAll)
document.getElementById("submitMessage").addEventListener("click", sendMessage)

// let userId = JSON.parse(window.localStorage.getItem("userInfo")).data.userId;
let userId = "3"

// let beaconHere = [{ "beaconName" : "121212341234123123213123", "beaconId": "12id", },{ "beaconName" : "13", "beaconId": "13id", },{ "beaconName" : "14", "beaconId": "14id", },{ "beaconName" : "15", "beaconId": "15id", },{ "beaconName" : "16", "beaconId": "16id", },{ "beaconName" : "17", "beaconId": "17id", },{ "beaconName" : "18", "beaconId": "18id", },{ "beaconName" : "19", "beaconId": "19id", },{ "beaconName" : "20", "beaconId": "20id", },{ "beaconName" : "21", "beaconId": "21id", },{ "beaconName" : "22", "beaconId": "22id", },{ "beaconName" : "23", "beaconId": "23id", },{ "beaconName" : "24", "beaconId": "24id", },{ "beaconName" : "25", "beaconId": "25id", },{ "beaconName" : "26", "beaconId": "26id", },{ "beaconName" : "27", "beaconId": "27id", },{ "beaconName" : "28", "beaconId": "28id", },{ "beaconName" : "29", "beaconId": "29id", },{ "beaconName" : "30", "beaconId": "30id", },{ "beaconName" : "31", "beaconId": "31id", },{ "beaconName" : "32", "beaconId": "32id", },{ "beaconName" : "33", "beaconId": "33id", },{ "beaconName" : "34", "beaconId": "34id", },{ "beaconName" : "35", "beaconId": "35id", },{ "beaconName" : "36", "beaconId": "36id", },{ "beaconName" : "37", "beaconId": "37id", },{ "beaconName" : "38", "beaconId": "38id", },{ "beaconName" : "39", "beaconId": "39id", },{ "beaconName" : "40", "beaconId": "40id", },{ "beaconName" : "41", "beaconId": "41id", },{ "beaconName" : "42", "beaconId": "42id", },{ "beaconName" : "43", "beaconId": "43id", },{ "beaconName" : "44", "beaconId": "44id", },{ "beaconName" : "45", "beaconId": "45id", },{ "beaconName" : "46", "beaconId": "46id", },{ "beaconName" : "47", "beaconId": "47id", },{ "beaconName" : "48", "beaconId": "48id", },{ "beaconName" : "49", "beaconId": "49id", },{ "beaconName" : "50", "beaconId": "50id", },{ "beaconName" : "51", "beaconId": "51id", },{ "beaconName" : "52", "beaconId": "52id", },{ "beaconName" : "53", "beaconId": "53id", },{ "beaconName" : "54", "beaconId": "54id", },{ "beaconName" : "55", "beaconId": "55id", },{ "beaconName" : "56", "beaconId": "56id", },{ "beaconName" : "57", "beaconId": "57id", },{ "beaconName" : "58", "beaconId": "58id", },{ "beaconName" : "59", "beaconId": "59id", },]

const viewHere = document.getElementById('beaconHere')
const viewAll = document.getElementById('beaconAll')
const lineSelect = document.getElementById('lineSelect')
document.getElementById("lineSelect").addEventListener("change", function() {changeLine(lineSelect.value)})

// 현재 위치의 비콘 검색 및 아이콘 생성
function scanBeacon() {
  fetch ("http://k4b101.p.ssafy.io/api/message/beacon/" + userId, {method: "GET",})
  .then((res) => res.json())
  .then((result => {
    // if (result.state == 200) {
      console.log("connected! - here")
      console.log(result);
      let cell = document.getElementById("beaconHere")
      while (cell.hasChildNodes()) {
        cell.removeChild(cell.firstChild)
      }
      console.log(result.data)
      let beaconHere = result.data
      beaconHere.forEach.call(beaconHere, function(beacon) {
        let item = document.createElement("div")
        item.className = "item"
        item.innerHTML = beacon.beaconName
        if (beacon.beaconName.length > 12) {
          item.classList.add("smallLetter")
        }
        item.addEventListener("click", function(){openModal(beacon.beaconName, beacon.beaconId)})
        viewHere.appendChild(item)
      }
      )
    }))
  .catch((err) => console.log(err))
}

setTimeout(scanBeacon, 0)
// let scanning = setInterval(scanBeacon, 3000)

function stopScan() {
  clearInterval(scanning)
}

function letScan() {
  scanning = setInterval(scanBeacon, 3000)
}

let beaconAll = []
let lineAll = {}

// 모든 위치의 비콘 검색 및 아이콘 생성
fetch("http://k4b101.p.ssafy.io/api/beacon/list", {method: "GET",})
.then((res) => res.json())
.then((result) => {
  console.log("connected! - all")
  beaconAll = result.data.beacon_info
  lineAll = result.data.line_equipment
  console.log(beaconAll)
  console.log(lineAll)
  beaconAll.forEach.call(beaconAll, function(beacon) {
    let item = document.createElement("div")
    item.className = "item"
    let beaconName = beacon.equipment
    item.innerHTML = beaconName
    item.classList.add(beacon.line)
    if (beaconName.length > 8) {
      item.classList.add("smallLetter")
    }
    item.addEventListener("click", function(){openModal(beaconName, beacon.beacon_id)})
    viewAll.appendChild(item)
  })

  for (let key in lineAll) {
    let list = document.createElement("option")
    list.className = "line"
    list.value = key
    list.innerHTML = key
    lineSelect.appendChild(list)
  }
})
.catch((err) => console.log(err))

// current / all switch
let everyBeacon = true
function seeAll() {
  let btn = document.getElementById('seeAll')
  if (everyBeacon) {
    btn.innerHTML = "현재 설비 보기"
    everyBeacon = false
    stopScan()
    viewAll.classList.remove("invisible")
    viewHere.classList.add("invisible")
  }
  else {
    btn.innerHTML = "전체 설비 보기"
    everyBeacon = true
    setTimeout(scanBeacon, 0)
    letScan()
    viewHere.classList.remove("invisible")
    viewAll.classList.add("invisible")
    changeLine('')
  }
}

function changeLine(value) {
  let i;
  let lineAllSelect = document.getElementsByClassName('line')
  let selected = document.getElementsByClassName(value)

  for (i = 0; i < lineAllSelect.length; i++) {
    console.log(value)
    if (lineAllSelect[i].className.indexOf('invisible') <= -1) filterAdd(lineAllSelect[i], "invisible");
    if (lineAllSelect[i].className.indexOf(value) > -1) filterRemove(lineAllSelect[i], "invisible");
  }
}

function filterAdd(elem, name) {
  console.log('add')
  let i, arr1
  arr1 = elem.className.split(" ")
  while (arr1.indexOf(name) > -1) {
    arr1.splice(arr1.indexOf(name), 1)
  }
  elem.className = arr1.join(" ")
}

function filterRemove(elem, name) {
  console.log('remove')
  let i, arr1
  arr1 = elem.className.split(" ")
  if (arr1.indexOf(name) == -1) {
    elem.className += " "+name
  }
}

let modal = document.getElementById("modal")
let textarea = document.getElementById("message")
function openModal(beaconName, beaconId) {
  console.log('open')
  let name = document.getElementById("beaconName")
  modal.classList.add("m-show-modal")
  name.innerHTML = beaconName
  textarea.name = beaconId
}

function closeModal() {
  modal.classList.remove("m-show-modal")
}

window.addEventListener('click', (e) => {
  let modal = document.getElementById("modal")
  e.target === modal ? modal.classList.remove("m-show-modal") : false
})

function sendMessage() {
  let message = document.getElementById("message")
  console.log(message.value)
  console.log(message.name)
  let messageContent = {
    "beaconId": textarea.name,
    "message": message.value,
    "userId": userId,
  }

  fetch("http://k4b101.p.ssafy.io/api/message/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageContent),
  }) 
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
    console.log(messageContent)
    if (result.status) {
      closeModal()
    }
    else {
      alert(result.status)
    }
  })
  .catch((err) => console.log(err))
}

window.onload = function() {
  let circle = document.getElementById("scanning")
  let word = document.getElementById("scanning-2")
  circle.classList.add("invisible")
  word.classList.add("invisible")
}