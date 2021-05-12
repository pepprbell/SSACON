document.getElementById("closeMessage").addEventListener("click", closeModal)
document.getElementById("submitMessage").addEventListener("click", sendMessage)
document.getElementById("seeAll").addEventListener("click", seeAll)

let beaconHere = [
  { "beaconName" : "#1" },
]

let beaconAll = [
  {
    "beaconName": "#11",
  },
  {
    "beaconName": "#2",
  },
  {
    "beaconName": "#3",
  },
  {
    "beaconName": "#4",
  },
  {
    "beaconName": "#5",
  },
  {
    "beaconName": "#6",
  },
  {
    "beaconName": "#7",
  },
  {
    "beaconName": "#8",
  },
]

const viewHere = document.getElementById('beaconHere')
const viewAll = document.getElementById('beaconAll')

// fetch ("http://k4b101.p.ssafy.io/api/message/beacon/{}", {method: "GET",})
// .then((res) => res.json())
// .then((result => {
//   console.log(result)
//   beaconHere = result.data
// }))
// .catch((err) => console.log(err))

beaconHere.forEach(function(beacon) {
  let item = document.createElement("div")
  item.className = "item"
  item.innerHTML = beacon.beaconName
  item.addEventListener("click", function(){openModal(beacon.beaconName)})
  viewHere.appendChild(item)
})

// fetch("http://k4b101.p.ssafy.io/api/beacon/list", {method: "GET",})
// .then((res) => res.json())
// .then((result) => {
//   console.log(result)
//   // beaconAll = result.data
// })
// .catch((err) => console.log(err))

beaconAll.forEach(function(beacon) {
  let item = document.createElement("div")
  item.className = "item"
  item.id = beacon.beaconName
  item.innerHTML = beacon.beaconName
  item.addEventListener("click", function(){openModal(beacon.beaconName)})
  viewAll.appendChild(item)
})

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

function openModal(beaconName) {
  console.log('open')
  let modal = document.getElementById("modal")
  let name = document.getElementById("beaconName")
  modal.classList.add("m-show-modal")
  name.innerHTML = beaconName
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
  let message = document.getElementById("message").value
  console.log(message)
  // fetch("http://k4b101.p.ssafy.io/api/message/", {
  //   method: "POST",
  //   body: {
  //     "message": message
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