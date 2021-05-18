let alarmlist = [
    {
        "id": 1,
        "type": "takeover",
        "line": "line1",
        "Location": "F2",
        "equipment": "D2",
        "writer": "구진범",
        "description": "매 정각 3번 안전핀 확인",
        "time": "2020-05-14 16:43:22",
    },
    {
        "id": 2,
        "type": "checksheet",
        "line": "line1",
        "equipment": "D2",
        "properBeaconId": "D3",
        "submissionBeaconId": "D4",
        "time": "2020-05-14 16:43:22",
    },
    {
        "id": 3,
        "type": "warning",
        "line": "line1",
        "location": "F2",
        "equipment": "D2",
        "minProperHumidity": 25.2,
        "maxProperHumidity": 27.2,
        "minProperTemperature": 13.3,
        "maxProperTemperature": 15.6,
        "nowHumidty": 22.2,
        "nowTemperature": 17.4,
        "time": "2020-05-14 16:43:22",
    },
    {
        "id": 4,
        "type": "attendance",
        "line": "line1",
        "session": "정기 안전교육",
        "time": "2020-05-14 16:43:22",
    },
    {
        "id": 5,
        "type": "battery",
        "line": "line1",
        "location": "F2",
        "equipment": "D2",
        "battery": 32.5,
        "time": "2020-05-14 16:43:22",
    },
]

const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
const body = document.querySelector('body')

// 알림 목록 불러오기
fetch(`http://k4b101.p.ssafy.io/api/alarm/${userInfo.data.userId}`, {
    method: 'GET',
})
.then((res) => {
    return res.json();
})
.then((result) => {
    console.log(result.data);
    showAlarmList(result.data)
})


// 받아온 알람리스트를 화면에 띄운다.
function showAlarmList(alarmlist) {
    console.log(alarmlist);
    alarmlist.forEach((alarm) => {
        let item = document.createElement("div")
        let left = document.createElement("div")
        let right = document.createElement("div")
    
        left.className="left"
        right.className="right"
    
        item.className="alarm"
        if(alarm.type == "takeover") {
            let icon = document.createElement("img")
            icon.src="./icons/info.png"
            icon.className="icon"
            left.appendChild(icon)
    
            let type = document.createElement("div")
            type.className ="type"
            type.innerHTML="인수 인계"
            right.appendChild(type)
    
            // let info = document.createElement("div")
            // info.className="info"
            // info.innerHTML= alarm.line + " " + alarm.equipment
            // item.appendChild(info)
            
            let description = document.createElement("div")
            description.className ="description"
            description.innerHTML= " [ " + alarm.writer + " ] " + alarm.line+ "-" + alarm.equipment+ " " + alarm.description
            right.appendChild(description)
        }
        else if(alarm.type == "checksheet") {
            if(alarm.properBeaconId == alarm.submissionBeaconId) {
                // 잘 제출 한 경우
    
                let icon = document.createElement("img")
                icon.src="./icons/success.png"
                icon.className="icon"
                left.appendChild(icon)
    
                let type = document.createElement("div")
                type.className ="type"
                type.innerHTML= "체크시트 제출 확인"
                right.appendChild(type)
    
                let description = document.createElement("div")
                description.className = "description"
                description.innerHTML = alarm.line + " 라인 " + alarm.equipment + " 설비 체크시트 제출 확인"
                right.appendChild(description)
            }
            else {
                let icon = document.createElement("img")
                icon.src="./icons/warning.png"
                icon.className="icon"
                left.appendChild(icon)
    
                let type = document.createElement("div")
                type.className ="type"
                type.innerHTML= "잘못된 위치에서 체크시트 제출"
                right.appendChild(type)
    
                let description = document.createElement("div")
                description.className = "description"
                description.innerHTML = alarm.line + " 라인 " + alarm.equipment + " 설비 체크시트 제출 확인(위치 재확인 요망)"
                right.appendChild(description)
            }
        }
        else if(alarm.type == "warning") {
            let icon = document.createElement("img")
            icon.src="./icons/danger.png"
            icon.className="icon"
            left.appendChild(icon)
    
            let type = document.createElement("div")
            type.className ="type"
            type.innerHTML= "위험"
            right.appendChild(type)
    
            let description = document.createElement("div")
            description.className ="description"
            description.innerHTML= alarm.line + " 라인 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요" 
            right.appendChild(description)
        }
        else if(alarm.type == "attendance") {
            let icon = document.createElement("img")
            icon.src="./icons/success.png"
            icon.className="icon"
            left.appendChild(icon)
    
            let type = document.createElement("div")
            type.className ="type"
            type.innerHTML= "교육장 출석"
            right.appendChild(type)
    
            let description = document.createElement("div")
            description.className ="description"
            description.innerHTML= alarm.session + " 출석 완료"
            right.appendChild(description)
            
        }
        else if(alarm.type == "battery") {
            let icon = document.createElement("img")
            icon.src="./icons/danger.png"
            icon.className="icon"
            left.appendChild(icon)
    
            let type = document.createElement("div")
            type.className ="type"
            type.innerHTML= "비콘 배터리 잔량 부족"
            right.appendChild(type)
    
            let description = document.createElement("div")
            description.className ="description"
            description.innerHTML= alarm.line+ "-" + alarm.equipment + " 비콘 배터리 잔량이 " + alarm.battery + "%입니다. 점검해주세요."
            right.appendChild(description)
        }
    
        let time = document.createElement("div")
        time.className = "time"
        let datatime = timeForToday(alarm.time)
        time.innerHTML = datatime
        right.appendChild(time)
    
        item.appendChild(left)
        item.appendChild(right)
        
        item.addEventListener('click', () => {
            window.location.href="file:///android_asset/www/template/alarm/alarmdetail.html" + "?id=" + alarm.id ;
        })
        body.appendChild(item)
    })
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



