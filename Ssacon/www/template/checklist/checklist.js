document.getElementById("checkSubmit").addEventListener("click",checkSubmit)

// test parameters
let checkName = "조작장치가 정상적으로 작동하는가?"
let machine = "음극분체호퍼"
let beaconId = "sampleId"
let beaconName = "sampleName"
let properbeaconId = "properbeaconId"
let userId = "3"

// change innerHTML
document.getElementById("machineName").innerHTML = machine

// load userId for beacon scanning
// userInfo = window.localStorage.getItem("userInfo")
// console.log(JSON.parse(userInfo))
// userInfo = JSON.parse(userInfo)
// userId = userInfo.data.userId

// beacon scanning
function getBeacon() {
  fetch("http://k4b101.p.ssafy.io/api/message/beacon/" + userId, {
    method: "GET",
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result.data)
    beaconId = result.data[0].beaconId
    beaconName = result.data[0].beaconName
    document.getElementById("beaconName").innerHTML = beaconName
  })
  // testcode
  // document.getElementById("beaconName").innerHTML = Date()
}

// beacon scanning - initially 0s, interval 3s
setTimeout(getBeacon, 0)
// setInterval(getBeacon, 3000)

function checkSubmit() {
  // let options = document.querySelector('input[name=cRadio]:checked').value
  // console.log(options)
  let submitContent = {
    "machine": machine,
    "checkName": checkName,
    "beaconId": beaconId,
    "properbeaconId": properbeaconId,
    "userId": userId,
  }

  fetch("http://k4b101.p.ssafy.io/api/checksheet/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submitContent),
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
    data = result.data
    if (result.status == 200) {
      alert("제출이 완료되었습니다.")
      window.location = "../sheetlist/sheetlist.html"
    }
  })
  .catch((err) => console.log(err))
}