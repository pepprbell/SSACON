let beacons = [];
let BeaconStatus = document.querySelector("#BeaconStatus");
let BeaconWorker = document.querySelector("#BeaconWorker");
let BeaconAnimation = document.querySelector("#BeaconAnimation");
let BeaconInfo = document.querySelector("#BeaconInfo");
let nonSignalWorker, onSignalWorker;

const beacon__map = document.querySelector(".Beacon__map");
beacon__map.addEventListener("click", (event) => {
  // 기존 비콘,워커 정보 지우기
  const BeaconStatus = document.querySelector("#BeaconStatus");
  const WorkerStatus = document.querySelector("#WorkerStatus");
  while (BeaconStatus.hasChildNodes()) {
    BeaconStatus.removeChild(BeaconStatus.firstChild);
  }
  while (WorkerStatus.hasChildNodes()) {
    WorkerStatus.removeChild(WorkerStatus.firstChild);
  }
  // 기존 네모 지우기
  // console.log('네모 지우기')
  const before_area = beacon__map.querySelector(".picked_area");
  // const seeAllB = document.getElementById('BeaconStatus')
  // const seeAllW = document.getElementById('WorkerStatus')
  if (before_area) {
    // console.log(before_area, '지움')
    before_area.remove();
    // seeAllB.classList.remove('invisible')
    // seeAllW.classList.remove('invisible')
  }
  if (event.target.classList.contains("Beacon__item")) {
    // console.log("비콘");
    // console.log('네모만들어라')
    // 새 네모 만들기
    // seeAllB.classList.add('invisible')
    // seeAllW.classList.add('invisible')
    const now_area = document.createElement("div");
    now_area.className = "picked_area";
    now_area.style.width = "20%";
    now_area.style.height = "20%";
    // console.log(event.target.dataset.left)
    // console.log(event.target.dataset.top)
    now_area.style.left = `${event.target.dataset.left * 1 - 8.5}%`;
    now_area.style.top = `${event.target.dataset.top * 1 - 8.5}%`;
    // console.log(now_area.style.left,now_area.style.top)
    // console.log(now_area)
    beacon__map.appendChild(now_area);

    // 오른쪽에 데이터 해당 비콘 관련 정보로 넣기
    // beacons에 들어있음
    for (let i = 0; i < beacons.length; i++) {
      if (beacons[i].beaconId == event.target.dataset.id) {
        // 클릭한 비콘의 정보
        // console.log(beacons[i]);
        // console.log(document.getElementsByClassName("beaconmoving").length);
        if (document.getElementsByClassName("beaconmoving").length == 0) {
          const BeaconAnimation = document.createElement("div");
          BeaconAnimation.className = "beaconanimation";
          let BeacondataName = beacons[i].beaconName;
          let BeaconBattery = beacons[i].beaconBattery;
          let BeaconId = beacons[i].beaconId;
          let BeaconMoisture = beacons[i].beaconMoisture;
          let BeaconTemperature = beacons[i].beaconTemperature;
          let BeaconTempMax = beacons[i].tempMax;
          let BeaconTempMin = beacons[i].tempMin;

          let bodyheader = document.createElement("div");
          let headerbackground = document.createElement("img");

          headerbackground.src = "../../assets/pics/background2.jpg";
          headerbackground.className = "headerbackground";
          // bodyheader.appendChild(headerbackground);
          BeaconAnimation.appendChild(bodyheader);

          //detail
          let bodydetail = document.createElement("div");
          bodydetail.className = "bodydetail";
          let BeaconMovingImg = document.createElement("img");
          let bodydetailimgdiv = document.createElement("div");

          bodydetailimgdiv.className = "bodydetailimgdiv";
          let BeaconName = document.createElement("div");
          BeaconMovingImg.src = "../../assets/pics/buildthing.png";
          BeaconMovingImg.className = "beaconmoving";
          bodydetailimgdiv.appendChild(BeaconMovingImg);
          BeaconName.className = "beaconname";
          BeaconName.innerHTML = `<div>
          <h2>${BeacondataName}</h2>
          <p>비콘ID : ${BeaconId}</p>
          </div>`;

          bodydetail.appendChild(bodydetailimgdiv);
          bodydetail.appendChild(BeaconName);
          BeaconAnimation.appendChild(bodydetail);

          //beacondataa
          let BeaconData = document.createElement("div");
          let BeacondataDetail = document.createElement("div");
          let BeacondataBattery = document.createElement("div");
          let BeacondataTemperature = document.createElement("div");
          let BeacondataMoisture = document.createElement("div");
          let BeacondataTemperatureAlarm = document.createElement("div");
          let Beacondataleft = document.createElement("div");
          let Beacondataright = document.createElement("div");
          Beacondataleft.className = "Beacondataleft";
          Beacondataright.className = "Beacondataright";
          BeaconData.className = "BeaconData";
          BeacondataDetail.className = "BeacondataDetail ";
          BeacondataBattery.className = "BeacondataBattery infocard";
          BeacondataMoisture.className = "BeacondataMoisture infocard";
          BeacondataTemperature.className = "BeacondataTemperature infocard";
          BeacondataTemperatureAlarm.className =
            "BeacondataTemperatureAlarm infocard";
          BeacondataBattery.innerHTML = `  <h3>${BeaconBattery}%</h3>
          <p>Battery</p>`;
          BeacondataTemperature.innerHTML = `  <h3>${BeaconTemperature}℃</h3>
          <p>Temperature</p>`;
          BeacondataMoisture.innerHTML = `  <h3>${BeaconMoisture}%</h3>
          <p>Moisture</p>`;
          BeacondataTemperatureAlarm.innerHTML = `  <h3>${BeaconTempMax}℃ ~ ${BeaconTempMin}℃</h3>
          <p>Warning Range</p>`;
          Beacondataleft.appendChild(BeacondataBattery);
          Beacondataright.appendChild(BeacondataTemperature);
          Beacondataleft.appendChild(BeacondataMoisture);
          Beacondataright.appendChild(BeacondataTemperatureAlarm);
          BeacondataDetail.appendChild(Beacondataleft);
          BeacondataDetail.appendChild(Beacondataright);
          BeaconData.appendChild(BeacondataDetail);
          BeaconAnimation.appendChild(BeaconData);
          BeaconStatus.appendChild(BeaconAnimation);
        }
        // let data = document.createElement("div");
        // data.innerHTML = beacons[i];
        // content.appendChild(data);
        // 오른쪽에 자료를 넣기

        // 넣기전에 한번 초기화
        WorkerStatus.innerHTML =
          "<ul class='subm-title'>" +
          "<li class='subm-username'>이름</li>" +
          "<li class='subm-part'>파트</li>" +
          "<li class='subm-scan'>스캔 여부</li>";

        // 오른쪽에 자료를 넣

        const workers_on_beacon = beacons[i].connectWorkers;
        const missing_on_beacon = beacons[i].nonConnectWorkers;
        for (let i = 0; i < workers_on_beacon.length; i++) {
          const worker_row = document.createElement("ul");
          const worker_username = document.createElement("li");
          const worker_part = document.createElement("li");
          const worker_scan = document.createElement("li");

          worker_row.className = "subm-white";
          worker_username.className = "subm-username";
          worker_part.className = "subm-part";
          worker_scan.className = "subm-scan";

          worker_username.innerHTML = workers_on_beacon[i].userName;
          worker_part.innerHTML = workers_on_beacon[i].partName;
          worker_scan.innerHTML = "O";

          worker_row.appendChild(worker_username);
          worker_row.appendChild(worker_part);
          worker_row.appendChild(worker_scan);

          WorkerStatus.appendChild(worker_row);
        }
        for (let i = 0; i < missing_on_beacon.length; i++) {
          const worker_row = document.createElement("ul");
          const worker_username = document.createElement("li");
          const worker_part = document.createElement("li");
          const worker_scan = document.createElement("li");

          worker_row.className = "subm-white";
          worker_username.className = "subm-username";
          worker_part.className = "subm-part";
          worker_scan.className = "subm-scan";

          worker_username.innerHTML = missing_on_beacon[i].userName;
          worker_part.innerHTML = missing_on_beacon[i].partName;
          worker_scan.innerHTML = "X";

          worker_row.appendChild(worker_username);
          worker_row.appendChild(worker_part);
          worker_row.appendChild(worker_scan);

          WorkerStatus.appendChild(worker_row);
        }
        break;
      }
    }
  } else {
    // console.log("ㄴㄴ");
    // 넣기전에 한번 초기화
    BeaconStatus.innerHTML =
      "<ul class='subm-title'>" +
      "<li class='subm-name'>이름</li>" +
      "<li class='subm-temp'>온도(°C)</li>" +
      "<li class='subm-humi'>습도(%)</li>" +
      "<li class='subm-batt'>배터리(%)</li>";
    WorkerStatus.innerHTML =
      "<ul class='subm-title'>" +
      "<li class='subm-username'>이름</li>" +
      "<li class='subm-part'>파트</li>" +
      "<li class='subm-scan'>스캔 여부</li>";
    // 오른쪽에 전체 목록 관련으로 바꾸기
    for (let i = 0; i < beacons.length; i++) {
      //비콘들 정보 넣기
      let beacon = beacons[i];
      let item = document.createElement("ul");

      let name = document.createElement("li");
      name.className = "subm-name";
      name.innerHTML = beacon.beaconName;
      item.appendChild(name);

      let temp = document.createElement("li");
      temp.className = "subm-temp";
      temp.innerHTML = beacon.beaconTemperature;
      item.appendChild(temp);

      let humi = document.createElement("li");
      humi.className = "subm-humi";
      humi.innerHTML = beacon.beaconMoisture;
      item.appendChild(humi);

      let batt = document.createElement("li");
      batt.className = "subm-batt";
      batt.innerHTML = beacon.beaconBattery;
      item.appendChild(batt);
      BeaconStatus.appendChild(item);
      // 넣기전에 한번 초기화

      // 근무자들 정보 넣기
      if (beacon.connectWorkers.length) {
        beacon.connectWorkers.forEach.call(
          beacon.connectWorkers,
          function (person) {
            let Witem = document.createElement("ul");

            let Wname = document.createElement("li");
            Wname.className = "subm-username";
            Wname.innerHTML = person.userName;
            Witem.appendChild(Wname);

            let Wtemp = document.createElement("li");
            Wtemp.className = "subm-part";
            Wtemp.innerHTML = person.partName;
            Witem.appendChild(Wtemp);

            let Whumi = document.createElement("li");
            Whumi.className = "subm-scan";
            Whumi.innerHTML = "O";
            Witem.appendChild(Whumi);
            console.log(Witem);
            WorkerStatus.appendChild(Witem);
          }
        );
      }
      if (beacon.nonConnectWorkers.length) {
        beacon.nonConnectWorkers.forEach.call(
          beacon.nonConnectWorkers,
          function (person) {
            let Witem = document.createElement("ul");

            let Wname = document.createElement("li");
            Wname.className = "subm-username";
            Wname.innerHTML = person.userName;
            Witem.appendChild(Wname);

            let Wtemp = document.createElement("li");
            Wtemp.className = "subm-part";
            Wtemp.innerHTML = person.partName;
            Witem.appendChild(Wtemp);

            let Whumi = document.createElement("li");
            Whumi.className = "subm-scan";
            Whumi.innerHTML = "X";
            Witem.appendChild(Whumi);

            WorkerStatus.appendChild(Witem);
          }
        );
      }
    }
  }
});
const beacon__map__width = beacon__map.clientWidth;
const beacon__map__height = beacon__map.clientHeight;
const x_diff = [-7.5, -0.5, 6.5, -7.5, 6.5, -7.5, -0.5, 6.5];
const y_diff = [-8, -8, -8, -1, -1, 6, 6, 6];
let beacon__cnt = 9;

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

// --- Piechart start
let myCanvas = document.getElementById("myCanvas");
var total = document.getElementById("total");

var ctx = myCanvas.getContext("2d");
function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.stroke();
}
function drawPieSlice(
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

// slice angle = 2 * PI * category value / total value
var Piechart = function (options) {
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;
  this.legend = options.legend;

  this.draw = function () {
    var total_value = 0;
    var color_index = 0;
    for (var categ in this.options.data) {
      var val = this.options.data[categ];
      total_value += val;
    }

    var start_angle = 0;
    for (categ in this.options.data) {
      val = this.options.data[categ];
      var slice_angle = (2 * Math.PI * val) / total_value;

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );

      start_angle += slice_angle;
      color_index++;
    }

    //drawing a white circle over the chart
    //to create the doughnut chart
    if (this.options.doughnutHoleSize) {
      start_angle = 0;
      for (categ in this.options.data) {
        val = this.options.data[categ];
        slice_angle = (2 * Math.PI * val) / total_value;
        var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
        var labelX =
          this.canvas.width / 2 +
          (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
        var labelY =
          this.canvas.height / 2 +
          (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

        if (this.options.doughnutHoleSize) {
          var offset = (pieRadius * this.options.doughnutHoleSize) / 2;
          labelX =
            -15 +
            this.canvas.width / 2 +
            (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
          labelY =
            +this.canvas.height / 2 +
            (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
        }

        var labelText = Math.round(val);
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 1vw Arial";
        this.ctx.fillText(labelText + "명", labelX, labelY);
        start_angle += slice_angle;
      }
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize *
          Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        "#ffffff'"
      );
      if (this.options.legend) {
        color_index = 0;
        let legenddiv = document.createElement("div");
        legenddiv.className = "mylegend";
        var legendHTML = "";
        for (categ in this.options.data) {
          legendHTML +=
            "<span style='display:inline-block;width:20px; height:20px; border-radius:100px; font-size : 1vw; background-color:" +
            this.colors[color_index++] +
            ";'>&nbsp;</span> " +
            categ;
        }
        legenddiv.innerHTML = legendHTML;
        const legendpart = document.querySelector(".mylegend");
        if (!legendpart) {
          this.options.legend.appendChild(legenddiv);
        }
      }
    }
  };
};

function Monitor() {
  fetch("http://k4b101.p.ssafy.io/api/monitoring/beacon", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      beacons = result.data.beacons;
      nonSignalWorker = result.data.nonSignalWorker.length;
      onSignalWorker = result.data.onSignalWorker.length;
      // 도넛 갱신
      const container = document.getElementById("content");
      var myDougnutChart = new Piechart({
        canvas: myCanvas,
        data: { 근무중: onSignalWorker, 자리이탈: nonSignalWorker },
        colors: ["#10cf4c", "#ff0000", "#57d9ff", "#937e88"],
        doughnutHoleSize: 0.5,
        legend: myLegend,
      });
      myDougnutChart.draw();
      // console.log(beacons);
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
        beacon__item.dataset.id = beacon.beaconId;
        beacon__item.dataset.left = beacon.xpos;
        beacon__item.dataset.top = beacon.ypos;
        beacon__item.style.left = `${beacon.xpos}%`;
        beacon__item.style.top = `${beacon.ypos}%`;
        const beacon__img = document.createElement("img");
        const beacon__items = document.querySelectorAll(".Beacon__item");
        //아픈 비콘은 표시를 해줌
        for (let i = 0; i < beacon__items.length; i++) {
          if (beacon__items[i].dataset.id == beacon.beaconId) {
            // 배터리 or 온습도
            if (
              beacon.beaconBattery <= 5 ||
              beacon.beaconMoisture > beacon.humiMax ||
              beacon.beaconMoisture < beacon.humiMin ||
              beacon.beaconTemperature > beacon.tempMax ||
              beacon.beaconTemperature < beacon.tempMin
            ) {
              if (!beacon__items[i].classList.contains("bad")) {
                beacon__items[i].classList.add("bad");
              }
            } else {
              if (beacon__items[i].classList.contains("bad")) {
                beacon__items[i].classList.remove("bad");
              }
            }
            break;
          }
        }
        //이미 추가댄 비콘이면 안 넣음
        let is_added = false;
        for (let i = 0; i < beacon__items.length; i++) {
          if (beacon__items[i].dataset.id == beacon.beaconId) {
            is_added = true;
            break;
          }
        }
        if (!is_added) {
          beacon__map.appendChild(beacon__item);
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
          alarmList.innerHTML = "";
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
            // console.log(alarmList);
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

async function render_first() {
  await fetch("http://k4b101.p.ssafy.io/api/monitoring/beacon", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      beacons = result.data.beacons;
    });
  // 넣기전에 한번 초기화
  BeaconStatus.innerHTML =
    "<ul class='subm-title'>" +
    "<li class='subm-name'>이름</li>" +
    "<li class='subm-temp'>온도(°C)</li>" +
    "<li class='subm-humi'>습도(%)</li>" +
    "<li class='subm-batt'>배터리(%)</li>";
  // 넣기전에 한번 초기화
  WorkerStatus.innerHTML =
    "<ul class='subm-title'>" +
    "<li class='subm-username'>이름</li>" +
    "<li class='subm-part'>파트</li>" +
    "<li class='subm-scan'>스캔 여부</li>";
  // 오른쪽에 전체 목록 관련으로 바꾸기
  for (let i = 0; i < beacons.length; i++) {
    //비콘들 정보 넣기
    let beacon = beacons[i];
    let item = document.createElement("ul");

    let name = document.createElement("li");
    name.className = "subm-name";
    name.innerHTML = beacon.beaconName;
    item.appendChild(name);

    let temp = document.createElement("li");
    temp.className = "subm-temp";
    temp.innerHTML = beacon.beaconTemperature;
    item.appendChild(temp);

    let humi = document.createElement("li");
    humi.className = "subm-humi";
    humi.innerHTML = beacon.beaconMoisture;
    item.appendChild(humi);

    let batt = document.createElement("li");
    batt.className = "subm-batt";
    batt.innerHTML = beacon.beaconBattery;
    item.appendChild(batt);
    BeaconStatus.appendChild(item);

    // 근무자들 정보 넣기
    if (beacon.connectWorkers.length) {
      beacon.connectWorkers.forEach.call(
        beacon.connectWorkers,
        function (person) {
          let Witem = document.createElement("ul");

          let Wname = document.createElement("li");
          Wname.className = "subm-username";
          Wname.innerHTML = person.userName;
          Witem.appendChild(Wname);

          let Wtemp = document.createElement("li");
          Wtemp.className = "subm-part";
          Wtemp.innerHTML = person.partName;
          Witem.appendChild(Wtemp);

          let Whumi = document.createElement("li");
          Whumi.className = "subm-scan";
          Whumi.innerHTML = "O";
          Witem.appendChild(Whumi);

          WorkerStatus.appendChild(Witem);
        }
      );
    }
    if (beacon.nonConnectWorkers.length) {
      beacon.nonConnectWorkers.forEach.call(
        beacon.nonConnectWorkers,
        function (person) {
          let Witem = document.createElement("ul");

          let Wname = document.createElement("li");
          Wname.className = "subm-username";
          Wname.innerHTML = person.userName;
          Witem.appendChild(Wname);

          let Wtemp = document.createElement("li");
          Wtemp.className = "subm-part";
          Wtemp.innerHTML = person.partName;
          Witem.appendChild(Wtemp);

          let Whumi = document.createElement("li");
          Whumi.className = "subm-scan";
          Whumi.innerHTML = "X";
          Witem.appendChild(Whumi);
          console.log(Witem);
          WorkerStatus.appendChild(Witem);
          console.log(WorkerStatus);
        }
      );
    }
  }
}

render_first();
Monitor();
setInterval(() => {
  Monitor();
}, 3000);
