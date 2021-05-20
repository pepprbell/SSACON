window.onload = init();

function init() {
  const container = document.getElementById('container')
  const cnt = document.querySelector('.subm-highlight')
  fetch("http://k4b101.p.ssafy.io/api/checksheet/", {method: "GET",})
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
    const lists = result.data
    const list_cnt = result.data.length
    cnt.innerHTML = `[${list_cnt}개]`
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
  })
  .catch((err) => console.log(err))
}


// let lists = [
//   {
//     "id": 1,
//     "machine": "#10음극P/D믹서#1",
//     "checkName": "믹싱 S Position",
//     "beaconName": "음극P/D믹서",
//   },
//   {
//     "id": 2,
//     "machine": "#10음극P/D믹서#2",
//     "checkName": "시작 전 안전점검 [믹싱]",
//     "beaconName": "양극H/D믹서",
//   },
// ]

