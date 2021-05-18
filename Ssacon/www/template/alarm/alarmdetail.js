const content = document.querySelector(".content")
console.log(window.location);
const alarmId = window.location.href.split("?")[1].split("=")[1]
const yesButton =  document.querySelector(".check")

yesButton.addEventListener('click', () => {
    window.history.back();
})


fetch(`http://k4b101.p.ssafy.io/api/alarm/one/${alarmId}`, {
    method:'GET',
})
.then((response) => {
    return response.json();
})
.then((result) => {
    console.log(result.data);
    alarmSep(result.data)
})
.catch((error) => {
    console.error(error)
})

// 얘는 그 리스트에서 클릭햇을 때 데이터 받은애
// alarm = {
//     "id": 1,
//     "type": "takeover",
//     "line": "line1",
//     "Location": "F2",
//     "equipment": "D2",
//     "writer": "구진범",
//     "description": "매 정각 3번 안전핀 확인 ",
//     "time": "2020-05-14 16:43:22",
// }

function alarmSep(alarm) {
    if(alarm.type == "takeover") {
        let type = document.createElement("div")
        type.className ="type"
        type.innerHTML="인수 인계"
        content.appendChild(type)
        
        let description = document.createElement("div")
            description.className ="description"
            description.innerHTML= " [ " + alarm.writer + " ] " + alarm.line+ "-" + alarm.equipment+ " " + alarm.description
        content.appendChild(description)
    }
    else if(alarm.type == "checksheet") {
        if(alarm.properBeaconId == alarm.submissionBeaconId) {
            // 잘 제출 한 경우
            let type = document.createElement("div")
            type.className ="type"
            type.innerHTML= "체크시트 제출 확인"
            content.appendChild(type)
    
            let description = document.createElement("div")
            description.className = "description"
            description.innerHTML = alarm.line + " 라인 " + alarm.equipment + " 설비 체크시트 제출 확인"
            content.appendChild(description)
        }
        else {
            // 위치가 다른 경우
            content.classList.add("wrong")
    
            let type = document.createElement("div")
            type.className ="type yellow"
            type.innerHTML= "잘못된 위치에서 체크시트 제출"
            content.appendChild(type)
    
            let description = document.createElement("div")
            description.className = "description"
            description.innerHTML = alarm.line + " 라인 " + alarm.equipment + " 설비 체크시트 제출 확인(위치 재확인 요망)"
            content.appendChild(description)
        }
    }
    else if(alarm.type == "warning") {
        content.classList.add("wrong")
    
        let type = document.createElement("div")
        type.className ="type yellow"
        type.innerHTML= "위험"
        content.appendChild(type)
    
        let description = document.createElement("div")
        description.className ="description"
        description.innerHTML= alarm.line + " 라인 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요"
        content.appendChild(description)
    }
    else if(alarm.type == "attendance") {
        let type = document.createElement("div")
        type.className ="type"
        type.innerHTML= "교육장 출석"
        content.appendChild(type)
    
        let description = document.createElement("div")
        description.className ="description"
        description.innerHTML= alarm.session + " 출석 확인"
        content.appendChild(description)
        
    }
    else if(alarm.type == "battery") {
        let type = document.createElement("div")
        type.className ="type"
        type.innerHTML= "비콘 배터리 잔량 부족"
        content.appendChild(type)
    
        let description = document.createElement("div")
        description.className ="description"
        description.innerHTML= alarm.line+ "-" + alarm.equipment + " 비콘 배터리 잔량이 " + alarm.battery + "%입니다. 점검해주세요."
        content.appendChild(description)
    } else {
        alert('존재하지 않은 비콘입니다.')
    }
    
    let time = document.createElement("div")
    time.className = "time"
    let datatime = timeForToday(alarm.time)
    time.innerHTML = datatime
    content.appendChild(time)
}
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

function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) return `${betweenTime}분전`;

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) return `${betweenTimeHour}시간전`;

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) return `${betweenTimeDay}일전`;

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

