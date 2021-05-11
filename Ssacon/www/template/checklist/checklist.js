let beaconName = "음극분체호퍼" 
// 현재 비콘 위치를 beaconName에 저장하기

document.getElementById("checkSubmit").addEventListener("click",this.checkSubmit.bind(this))

let changeName = document.getElementById("beaconName")
changeName.innerHTML = beaconName

function checkSubmit() {
  let options = document.querySelector('input[name=cRadio]:checked').value;
  console.log(options)
  console.log(beaconName)

  // fetch("http://k4b101.p.ssafy.io/api/checksheet/", {
  //   method: "POST",
  //   body: {
  //     "beaconName": beaconName,
  //   }
  // })
  // .then((res) => res.json())
  // .then((result) => {
  //   console.log(result)
  //   data = result.data
  //   console.log(data)
  //   return data;
  // })
  // .catch((err) => console.log(err))

  alert("제출이 완료되었습니다.")
  // 리디렉션 추가?
}