let alarmlist = [
  {
    id: 1,
    type: "takeover",
    line: "line1",
    Location: "F2",
    equipment: "D2",
    writer: "구진범",
    description: "매 정각 3번 안전핀 확인",
    time: "2021-05-15 12:43:22",
  },
  {
    id: 2,
    type: "checksheet",
    line: "line1",
    equipment: "D2",
    properLocation: "D3",
    submissionLocation: "D4",
    time: "2021-05-15 14:28:22",
  },
  {
    id: 3,
    type: "warning",
    line: "line1",
    location: "F2",
    equipment: "D2",
    minProperHumidity: 25.2,
    maxProperHumidity: 27.2,
    minProperTemperature: 13.3,
    maxProperTemperature: 15.6,
    nowHumidty: 22.2,
    nowTemperature: 17.4,
    time: "2021-04-14 16:43:22",
  },
  {
    id: 4,
    type: "attendance",
    line: "line1",
    session: "정기 안전교육",
    time: "2021-05-14 16:43:22",
  },
  {
    id: 5,
    type: "battery",
    line: "line1",
    location: "F2",
    equipment: "D2",
    battery: 32.5,
    time: "2021-05-14 16:43:22",
  },
];

const alarmList = document.querySelector("#alarmList");

// api 요청을 해서 내 알람 리스트를 받아온다.
// 걔를 body에 추가해준다.
// fetch(`http://k4b101.p.ssafy.io/api/alarm/${userID}`, {method:'GET',})
// .then((response) => {
//     return response.json();
// })
// .then((result) => {
//     alarmlist = result
// })
// .catch((error) => {
//     console.error(error)
// })

// 받아온 알람리스트를 화면에 띄운다.
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
    icon.className = "icon";
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
      icon.className = "icon";
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
      icon.className = "icon";
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
    icon.className = "icon";
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
    icon.className = "icon";
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
    icon.className = "icon";
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
  time.innerHTML = alarm.time;
  let timebewteen = timeForToday(alarm.time);
  left.innerText = timebewteen;
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
