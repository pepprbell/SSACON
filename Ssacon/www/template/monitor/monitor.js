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
        });
    });
}, 3000);
