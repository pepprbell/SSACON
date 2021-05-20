document.getElementById("checkSubmit").addEventListener("click", getBeacon)

// test parameters
let checkName = "시작 전 안전점검";
let equipment = "상온에이징";
let lineName = 'l101';
let properBeaconId = "D4:5C:67:6A:7A:7A";
let beaconId = null;
let beaconName = null;
let userId = JSON.parse(window.localStorage.getItem("userInfo")).data.userId;

// change innerHTML
document.getElementById("machineName").innerHTML = equipment

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
    let location = result.data
    if (!location.length) {
      alert('위치정보가 없습니다. 잠시 후 다시 시도해 주세요.')
      
      return
    } else {
      location.forEach(e => {
        if (e.beaconId === properBeaconId) {
          beaconId = e.beaconId
          beaconName = e.beaconName
          document.getElementById("beaconName").innerHTML = beaconName
        }
      });
      if (beaconId) {
        checkSubmit()
      } else {
        beaconId = location[0].beaconId
        beaconName = location[0].beaconName
        checkSubmit()
      }
    }
  })
  // testcode
  // document.getElementById("beaconName").innerHTML = Date()
}

// beacon scanning - initially 0s, interval 3s

// setInterval(getBeacon, 3000)

function checkSubmit() {
  // let options = document.querySelector('input[name=cRadio]:checked').value
  // console.log(options)
  let submitContent = {
    "line": lineName,
    "equipment": equipment,
    "checkName": checkName,
    "beaconId": beaconId,
    "properBeaconId": properBeaconId,
    "userId": userId,
  }
  console.log(submitContent);

  fetch("http://k4b101.p.ssafy.io/api/checksheet/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submitContent),
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result.status)
    if (result.status) {
      // alert(`${checkName} 제출이 완료되었습니다.`)
      const modal = document.createElement("div")
      const modal__background = document.createElement("div")
      const modal__yes = document.createElement("div")
      
      modal.className = 'modal'
      modal__background.className = 'modal__background'
      modal__yes.className = 'modal__yes'
      
      modal.innerHTML = `${checkName} 제출이 완료되었습니다.`
      modal__yes.innerHTML = '확인'
      modal.appendChild(modal__yes)

      const checklist__body = document.querySelector('body')

      checklist__body.appendChild(modal)
      checklist__body.appendChild(modal__background)
      // window.history.back()
    }
  })
  .catch((err) => console.log(err))
}

