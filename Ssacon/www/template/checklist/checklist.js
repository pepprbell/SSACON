document.getElementById("checkSubmit").addEventListener("click",checkSubmit)

let checkName = "조작장치가 정상적으로 작동하는가?"
let equipment = "음극분체호퍼"
let beaconId = "sampleId"
let beaconName = "sampleName"

// 비콘 위치 조회를 위한 userId 불러오기
userInfo = window.localStorage.getItem("userInfo")
console.log(JSON.parse(userInfo))
userInfo = JSON.parse(userInfo)
userId = userInfo.data.userId

// 비콘 조회
function getBeacon() {
  fetch("http://k4b101.p.ssafy.io/api/message/beacon/1", {
    method: "GET",
    body: {
      "userId": userId,
    }
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
    beaconId = result.data.beaconId
    beaconName = result.data.beaconName
    document.getElementById("beaconName").innerHTML = beaconName
  })
  // testcode
  // document.getElementById("beaconName").innerHTML = Date()
}

// 3초마다 비콘 조회
setTimeout(getBeacon, 0)
setInterval(getBeacon, 3000)

function checkSubmit() {
  // let options = document.querySelector('input[name=cRadio]:checked').value
  // console.log(options)
  console.log(beaconName)

  fetch("http://k4b101.p.ssafy.io/api/checksheet/", {
    method: "POST",
    body: {
      "beaconId": beaconId,
      "checkName": checkName,
      "equipment": equipment,
    }
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
    data = result.data
    console.log(data)
    return data;
  })
  .catch((err) => console.log(err))

  alert("제출이 완료되었습니다.")
  window.location = "../sheetlist/sheetlist.html"
}