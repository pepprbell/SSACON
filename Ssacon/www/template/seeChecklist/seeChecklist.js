window.onload = init();

function init() {
  fetch("http://k4b101.p.ssafy.io/api/monitoring/beacon/", {method: "GET",})
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
    data = result.data
    console.log(data)
  })
  .catch((err) => console.log(err))
}

const container = document.getElementById('container')

let lists = [
  {
    "id": 1,
    "machine": "#10음극P/D믹서#1",
    "checkName": "믹싱 S Position",
    "beaconName": "음극P/D믹서",
  },
  {
    "id": 2,
    "machine": "#10음극P/D믹서#2",
    "checkName": "시작 전 안전점검 [믹싱]",
    "beaconName": "양극H/D믹서",
  },
]

lists.forEach(function(checklist) {
  let item = document.createElement("ul")
  let mach = document.createElement("li")
  mach.className = "subm-mach"
  mach.innerHTML = checklist.machine
  item.appendChild(mach)
  
  let name = document.createElement("li")
  name.className = "subm-name"
  name.innerHTML = checklist.checkName
  item.appendChild(name)

  let place = document.createElement("li")
  place.className = "subm-place"
  place.innerHTML = checklist.beaconName
  item.appendChild(place)

  let task = document.createElement("li")
  task.className = "subm-task"
  task.innerHTML = "1/1"
  item.appendChild(task)

  container.appendChild(item)
})