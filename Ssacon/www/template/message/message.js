document.getElementById("closeMessage").addEventListener("click", closeModal)
document.getElementById("seeAll").addEventListener("click", seeAll)
document.getElementById("submitMessage").addEventListener("click", function(){sendMessage()})

// userInfo = window.localStorage.getItem("userInfo")
// console.log(JSON.parse(userInfo))
// userInfo = JSON.parse(userInfo)
// console.log(userInfo.data.userId)
// console.log(userInfo["data"])
// userId = userInfo.data.userId

let beaconHere = [
  {
    "beaconName" : "#11",
    "beaconId": "11-id",
  },
  {
    "beaconName" : "#22",
    "beaconId": "22-id",
  },
]

const viewHere = document.getElementById('beaconHere')
const viewAll = document.getElementById('beaconAll')

// 현재 위치의 비콘 검색 및 아이콘 생성
// fetch ("http://k4b101.p.ssafy.io/api/message/beacon/{$userId}", {method: "GET",})
// .then((res) => res.json())
// .then((result => {
//   console.log(result.data)
//   beaconHere = result.data
  beaconHere.forEach.call(beaconHere, function(beacon) {
    let item = document.createElement("div")
    item.className = "item"
    item.innerHTML = beacon.beaconName
    item.addEventListener("click", function(){openModal(beacon.beaconName, beacon.beaconId)})
    viewHere.appendChild(item)
  })
// }))
// .catch((err) => console.log(err))

// 모든 위치의 비콘 검색 및 아이콘 생성
fetch("http://k4b101.p.ssafy.io/api/monitoring/beacon", {method: "GET",})
.then((res) => res.json())
.then((result) => {
  console.log("connected! - all")
  beaconAll = result.data
  beaconAll.forEach.call(beaconAll, function(beacon) {
    let item = document.createElement("div")
    item.className = "item"
    item.innerHTML = beacon.beaconName
    item.addEventListener("click", function(){openModal(beacon.beaconName, beacon.beaconId)})
    viewAll.appendChild(item)
  })
})
.catch((err) => console.log(err))


// beaconAll.forEach(function(beacon) {
//   let item = document.createElement("div")
//   item.className = "item"
//   item.id = beacon.beaconName
//   item.innerHTML = beacon.beaconName
//   item.addEventListener("click", function(){openModal(beacon.beaconName)})
//   viewAll.appendChild(item)
// })

let everyBeacon = true

function seeAll() {
  let btn = document.getElementById('seeAll')
  if (everyBeacon) {
    btn.innerHTML = "현재 설비 보기"
    everyBeacon = false
    viewAll.classList.remove("invisible")
    viewHere.classList.add("invisible")
  }
  else {
    btn.innerHTML = "전체 설비 보기"
    everyBeacon = true
    viewHere.classList.remove("invisible")
    viewAll.classList.add("invisible")
  }
}

function openModal(beaconName, beaconId) {
  let modal = document.getElementById("modal")
  let name = document.getElementById("beaconName")
  let textarea = document.getElementById("message")
  modal.classList.add("m-show-modal")
  name.innerHTML = beaconName
  textarea.name = beaconId
}

function closeModal() {
  let modal = document.getElementById("modal")
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
  // fetch("http://k4b101.p.ssafy.io/api/message/", {
  //   method: "POST",
  //   body: {
  //     "beaconId": beaconId,
  //     "message": message.value,
  //     "userId": message.name,
  //   }
  // }) 
  // .then((res) => res.json())
  // .then((result) => {
  //   console.log(result)
  // })
  // .catch((err) => console.log(err))
  closeModal()
}

window.onload = function() {
  let circle = document.getElementById("scanning")
  let word = document.getElementById("scanning-2")
  // circle.classList.add("invisible")
  // word.classList.add("invisible")
}