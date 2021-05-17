const beacon__map = document.querySelector(".Beacon__map");
beacon__map.addEventListener("click", (event) => {
    // 기존 네모 지우기
    // console.log('네모 지우기')
    const before_area = beacon__map.querySelector(".picked_area")
    if(before_area) {
        // console.log(before_area, '지움')
        before_area.remove()
    }
    if(event.target.classList.contains("Beacon__item")) {
        // console.log('네모만들어라')
        // 새 네모 만들기
        const now_area = document.createElement("div")
        now_area.className = "picked_area"
        now_area.style.width = "20%"
        now_area.style.height = "20%"
        // console.log(event.target.dataset.left)
        // console.log(event.target.dataset.top)
        now_area.style.left = `${event.target.dataset.left*1-8.5}%`
        now_area.style.top = `${event.target.dataset.top*1-8.5}%`
        // console.log(now_area.style.left,now_area.style.top)
        // console.log(now_area)
        beacon__map.appendChild(now_area)
    }
})
const beacon__map__width = beacon__map.clientWidth;
const beacon__map__height = beacon__map.clientHeight;
const x_diff = [-7.5, -0.5, 6.5, -7.5, 6.5, -7.5, -0.5, 6.5];
const y_diff = [-8, -8, -8, -1, -1, 6, 6, 6];
let beacon__cnt = 9;

var requestOptions = {
  method: "GET",
  redirect: "follow",
};
let beacons = [];

function Monitor() {
  fetch("http://k4b101.p.ssafy.io/api/monitoring/beacon", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      beacons = result.data.beacons;
      console.log(beacons);
    })
    .then(() => {
      const beacon__workers = document.querySelectorAll(".Beacon__worker");
      if (beacon__workers.length != 0) {
        beacon__workers.forEach((each) => {
          each.remove();
        });
      }

      beacons.forEach((beacon) => {
        const beacon__item = document.createElement("div");
        beacon__item.className = "Beacon__item";
        beacon__item.dataset.id = beacon.beaconId
        beacon__item.dataset.left = beacon.xpos
        beacon__item.dataset.top = beacon.ypos
        beacon__item.style.left = `${beacon.xpos}%`;
        beacon__item.style.top = `${beacon.ypos}%`;
        const beacon__img = document.createElement("img");
        const beacon__items = document.querySelectorAll(".Beacon__item");
        //아픈 비콘은 표시를 해줌
        for(let i = 0; i < beacon__items.length; i++) {
          if(beacon__items[i].dataset.id == beacon.beaconId) {
              // 배터리 or 온습도
              if(beacon.beaconBattery <= 5 || beacon.beaconMoisture > beacon.humiMax || beacon.beaconMoisture < beacon.humiMin 
              || beacon.beaconTemperature > beacon.tempMax || beacon.beaconTemperature < beacon.tempMin) {
                if(!beacon__items[i].classList.contains("bad")){
                  beacon__items[i].classList.add("bad")
                }
              } else {
                if(beacon__items[i].classList.contains("bad")){
                  beacon__items[i].classList.remove("bad")
                }
              }
              break
          }
      }
        //이미 추가댄 비콘이면 안 넣음
        let is_added = false
        for(let i = 0; i < beacon__items.length; i++) {
            if(beacon__items[i].dataset.id == beacon.beaconId) {
                is_added = true
                break
            }
        }
        if(!is_added) {
            beacon__map.appendChild(beacon__item)
        }
        // console.log(beacon__items)
        

        let cnt = 0;
        
        if (beacon.connectWorkers !== undefined) {
          beacon.connectWorkers.forEach((worker) => {
            const beacon__worker = document.createElement("div");
            beacon__worker.className = "Beacon__worker";
            
            const beacon__worker__img = document.createElement("img");
            beacon__worker__img.className = "Beacon__worker__img";
            // beacon__worker.src="file:///android_asset/www/template/monitor/icons/person.png"
            beacon__worker__img.src = "./icons/person.png";
            // 해당 비콘 온습도 문제 있으면 빨간색으로 바꾸기
            beacon__worker.className = "Beacon__worker";
            beacon__worker.appendChild(beacon__worker__img);
          
            const x_pos = beacon.xpos + x_diff[cnt];
            const y_pos = beacon.ypos + y_diff[cnt];
            cnt += 1;
            // console.log(x_pos,y_pos,x_gob,y_gob)
            beacon__worker.style.left = `${x_pos}%`;
            beacon__worker.style.top = `${y_pos}%`;
            beacon__map.appendChild(beacon__worker);
          });
        }
        if (beacon.nonConnectWorkers !== undefined) {
          beacon.nonConnectWorkers.forEach((worker) => {
            const beacon__worker = document.createElement("div");
            beacon__worker.className = "Beacon__worker";
            
            const beacon__worker__img = document.createElement("img");
            beacon__worker__img.className = "Beacon__worker__img";
            // beacon__worker.src="file:///android_asset/www/template/monitor/icons/person.png"
            beacon__worker__img.src = "./icons/wrong.png";
            // 해당 비콘 온습도 문제 있으면 빨간색으로 바꾸기
            beacon__worker.className = "Beacon__worker";
            beacon__worker.appendChild(beacon__worker__img);
          
            const x_pos = beacon.xpos + x_diff[cnt];
            const y_pos = beacon.ypos + y_diff[cnt];
            cnt += 1;
            // console.log(x_pos,y_pos,x_gob,y_gob)
            beacon__worker.style.left = `${x_pos}%`;
            beacon__worker.style.top = `${y_pos}%`;
            // console.log(x_pos,y_pos)
            // console.log(beacon__worker.style.left, beacon__worker.style.top)
            beacon__map.appendChild(beacon__worker);
          });
        }
      });
    })
    .then(() => {
      // fetch(알람다가져온후) 거기에 기존에잇느거 지우고 다시 넣기
      let alarmUserInfo = window.localStorage.getItem("userInfo");
    //   console.log("확인", alarmUserInfo);
    //   console.log(JSON.parse(alarmUserInfo));
      alarmUserInfo = JSON.parse(alarmUserInfo);
      let userId = alarmUserInfo.data.userId;
      fetch(`http://k4b101.p.ssafy.io/api/alarm/${userId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alarmlist = result.data;
          alarmlist.forEach((alarm) => {
            let item = document.createElement("div");
            let left = document.createElement("div");
            let right = document.createElement("div");
            let right_title = document.createElement("div");
            right_title.className = "right_title";
            left.className = "left";
            right.className = "right";
            item.className = "alarm";
            let time = document.createElement("div");
            let timedifference = document.createElement("div");
            time.className = "time";
            timedifference.className = "timechange";
            let timebewteen = timeForToday(alarm.time);
            time.innerHTML = timebewteen;
            if (alarm.type == "takeover") {
              let icon = document.createElement("img");
              icon.src = "../alarm/icons/info.png";
              icon.className = "alarmicon";
              left.appendChild(icon);

              let type = document.createElement("div");
              type.className = "type";
              type.innerHTML = "인수 인계";
              right_title.appendChild(type);
              right_title.appendChild(time);
              right.appendChild(right_title);

              // let info = document.createElement("div")
              // info.className="info"
              // info.innerHTML= alarm.line + " " + alarm.equipment
              // item.appendChild(info)

              let description = document.createElement("div");
              description.className = "description";
              description.innerHTML =
                alarm.line +
                " " +
                alarm.equipment +
                " " +
                alarm.description +
                " - " +
                alarm.writer;
              right.appendChild(description);
            } else if (alarm.type == "checksheet") {
              if (alarm.properLocation == alarm.submissionLocation) {
                // 잘 제출 한 경우

                let icon = document.createElement("img");
                icon.src = "../alarm/icons/success.png";
                icon.className = "alarmicon";
                left.appendChild(icon);

                let type = document.createElement("div");
                type.className = "type";
                type.innerHTML = "체크시트 제출 확인";
                right_title.appendChild(type);
                right_title.appendChild(time);
                right.appendChild(right_title);

                let description = document.createElement("div");
                description.className = "description";
                description.innerHTML =
                  alarm.submissionLocation +
                  " 위치의 " +
                  alarm.equipment +
                  " 설비 체크시트 제출 확인";
                right.appendChild(description);
              } else {
                let icon = document.createElement("img");
                icon.src = "../alarm/icons/warning.png";
                icon.className = "alarmicon";
                left.appendChild(icon);

                let type = document.createElement("div");
                type.className = "type";
                type.innerHTML = "잘못된 위치에서 체크시트 제출";
                right_title.appendChild(type);
                right_title.appendChild(time);
                right.appendChild(right_title);

                let description = document.createElement("div");
                description.className = "description";
                description.innerHTML =
                  alarm.submissionLocation +
                  " 위치에서 " +
                  alarm.properLocation +
                  " 위치의 " +
                  alarm.equipment +
                  " 설비 체크시트 제출 확인";
                right.appendChild(description);
              }
            } else if (alarm.type == "warning") {
              let icon = document.createElement("img");
              icon.src = "../alarm/icons/danger.png";
              icon.className = "alarmicon";
              left.appendChild(icon);

              let type = document.createElement("div");
              type.className = "type";
              type.innerHTML = "위험";
              right_title.appendChild(type);
              right_title.appendChild(time);
              right.appendChild(right_title);

              let description = document.createElement("div");
              description.className = "description";
              description.innerHTML =
                alarm.location +
                " 위치의 " +
                alarm.equipment +
                "설비 온도가 적정범위를 벗어났습니다!";
              right.appendChild(description);
            } else if (alarm.type == "attendance") {
              let icon = document.createElement("img");
              icon.src = "../alarm/icons/success.png";
              icon.className = "alarmicon";
              left.appendChild(icon);

              let type = document.createElement("div");
              type.className = "type";
              type.innerHTML = "출석 확인";
              right_title.appendChild(type);
              right_title.appendChild(time);
              right.appendChild(right_title);

              let description = document.createElement("div");
              description.className = "description";
              description.innerHTML = alarm.session + " 출석 확인";
              right.appendChild(description);
            } else if (alarm.type == "battery") {
              let icon = document.createElement("img");
              icon.src = "../alarm/icons/danger.png";
              icon.className = "alarmicon";
              left.appendChild(icon);

              let type = document.createElement("div");
              type.className = "type";
              type.innerHTML = "비콘 배터리 잔량 부족";
              right_title.appendChild(type);
              right_title.appendChild(time);
              right.appendChild(right_title);
              let description = document.createElement("div");
              description.className = "description";
              description.innerHTML =
                alarm.line +
                " " +
                alarm.location +
                " 위치 " +
                alarm.equipment +
                " 비콘 배터리 잔량이 " +
                alarm.battery +
                "%입니다.";
              right.appendChild(description);
            }
            item.appendChild(left);
            item.appendChild(right);

            item.addEventListener("click", () => {
              window.location.href =
                "file:///android_asset/www/template/alarm/alarmdetail.html?" +
                "?id=" +
                alarm.id;
            });

            alarmList.appendChild(item);
          });
          function timeForToday(value) {
            const today = new Date();
            const timeValue = new Date(value);

            const betweenTime = Math.floor(
              (today.getTime() - timeValue.getTime()) / 1000 / 60
            );
            if (betweenTime < 1) return "방금전";
            if (betweenTime < 60) {
              return `${betweenTime}분전`;
            }

            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
              return `${betweenTimeHour}시간전`;
            }

            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            if (betweenTimeDay < 365) {
              return `${betweenTimeDay}일전`;
            }

            return `${Math.floor(betweenTimeDay / 365)}년전`;
          }
        });
    });
}

Monitor();
setInterval(() => {
  Monitor();
}, 3000);
