const beacon__map = document.querySelector(".Beacon__map");
const beacon__map__width = beacon__map.clientWidth;
const beacon__map__height = beacon__map.clientHeight;
const x_diff = [-4.5, -0.5, 3.5, -4.5, 3.5, -4.5, -0.5, 3.5];
const y_diff = [-5, -5, -5, -1, -1, 3, 3, 3];
let beacon__cnt = 9;

var requestOptions = {
  method: "GET",
  redirect: "follow",
};
let beacons = [];
beacons = [
  { xPos: 20, yPos: 20, connetWorkers: [1, 2, 3, 4, 5, 6, 7, 8] },
  {
    xPos: 20,
    yPos: 50,
    connetWorkers: [{ username: "신민호" }, { username: "정현우" }],
  },
  {
    xPos: 20,
    yPos: 80,
    connetWorkers: [{ username: "박승범" }, { username: "구진범" }],
  },
  {
    xPos: 50,
    yPos: 20,
    connetWorkers: [{ username: "신민호" }, { username: "정현우" }],
  },
  {
    xPos: 50,
    yPos: 50,
    connetWorkers: [{ username: "박승범" }, { username: "구진범" }],
  },
  {
    xPos: 50,
    yPos: 80,
    connetWorkers: [{ username: "신민호" }, { username: "정현우" }],
  },
  {
    xPos: 80,
    yPos: 20,
    connetWorkers: [{ username: "박승범" }, { username: "구진범" }],
  },
  {
    xPos: 80,
    yPos: 50,
    connetWorkers: [{ username: "신민호" }, { username: "정현우" }],
  },
  {
    xPos: 80,
    yPos: 80,
    connetWorkers: [{ username: "박승범" }, { username: "구진범" }],
  },
];

setInterval(() => {
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
        beacon__item.style.left = `${beacon.xPos}%`;
        beacon__item.style.top = `${beacon.yPos}%`;
        const beacon__img = document.createElement("img");
        const beacon__items = document.querySelectorAll(".Beacon__item");
        // console.log(beacon__items)
        if (beacon__items.length < 9) {
          beacon__map.appendChild(beacon__item);
          beacon__cnt += 1;
        }

        let cnt = 0;
        // console.log(beacon);
        if (beacon.connectWorkers.length > 0) {
          beacon.connetWorkers.forEach((worker) => {
            const beacon__worker = document.createElement("div");
            beacon__worker.className = "Beacon__worker";
            const beacon__worker__img = document.createElement("img");
            beacon__worker__img.className = "Beacon__worker__img";
            // beacon__worker.src="file:///android_asset/www/template/monitor/icons/person.png"
            beacon__worker__img.src = "./icons/person.png";

            beacon__worker.className = "Beacon__worker";
            beacon__worker.appendChild(beacon__worker__img);
            beacon__worker.addEventListener("click", () => {
              // 여기다가 오른쪽 표에 내용 바꿔주세요
            });
            const x_pos = beacon.xPos + x_diff[cnt];
            const y_pos = beacon.yPos + y_diff[cnt];
            cnt += 1;
            // console.log(x_pos,y_pos,x_gob,y_gob)
            beacon__worker.style.left = `${x_pos}%`;
            beacon__worker.style.top = `${y_pos}%`;
            beacon__map.appendChild(beacon__worker);
          });
        }
      });
    })
    .then(() => {
      // fetch(알람다가져온후) 거기에 기존에잇느거 지우고 다시 넣기
      let alarmUserInfo = window.localStorage.getItem("userInfo");
      console.log("확인", alarmUserInfo);
      console.log(JSON.parse(alarmUserInfo));
      alarmUserInfo = JSON.parse(alarmUserInfo);
      let userId = alarmUserInfo.data.userId;
      fetch(`http://k4b101.p.ssafy.io/api/alarm/${userId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alarmlist = result.data;
          console.log("alarm:", alarmlist);
          alarmlist.forEach((alarm) => {
            let item = document.createElement("div");
            let left = document.createElement("div");
            let right = document.createElement("div");

            left.className = "left";
            right.className = "right";

            item.className = "alarm";
            if (alarm.type == "takeover") {
              let icon = document.createElement("img");
              icon.src = "../alarm/icons/info.png";
              icon.className = "alarmicon";
              left.appendChild(icon);

              let type = document.createElement("div");
              type.className = "type";
              type.innerHTML = "인수 인계";
              right.appendChild(type);

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
                right.appendChild(type);

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
                right.appendChild(type);

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
              right.appendChild(type);

              let description = document.createElement("div");
              description.className = "description";
              description.innerHTML =
                alarm.location +
                " 위치의 " +
                alarm.equipment +
                "설비 온도가 적정범위를 벗어났습니다. 점검해주세요";
              right.appendChild(description);
            } else if (alarm.type == "attendance") {
              let icon = document.createElement("img");
              icon.src = "../alarm/icons/success.png";
              icon.className = "alarmicon";
              left.appendChild(icon);

              let type = document.createElement("div");
              type.className = "type";
              type.innerHTML = "출석 확인";
              right.appendChild(type);

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
              right.appendChild(type);

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
                "%입니다. 점검해주세요.";
              right.appendChild(description);
            }

            let time = document.createElement("div");
            let timedifference = document.createElement("div");
            time.className = "time";
            timedifference.className = "timechange";
            // time.innerHTML = alarm.time;

            let timebewteen = timeForToday(alarm.time);
            time.innerHTML = timebewteen;
            // left.innerText = timebewteen;
            right.appendChild(time);
            // left.appendChild(timebewteen);
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
}, 3000);
