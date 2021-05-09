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
        "properLocation": "D3",
        "submissionLocation": "D4",
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
]

const body = document.querySelector('body')

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
    let item = document.createElement("div")
    item.className="alarm"
    if(alarm.type == "takeover") {
        let type = document.createElement("div")
        type.className ="type"
        type.innerHTML="인수 인계"
        item.appendChild(type)

        let info = document.createElement("div")
        info.className="info"
        info.innerHTML= alarm.line + " " + alarm.equipment
        item.appendChild(info)
        
        let description = document.createElement("div")
        description.className ="description"
        description.innerHTML= alarm.description + " - " + alarm.writer
        item.appendChild(description)
    }
    else if(alarm.type == "checksheet") {
        if(alarm.equipment == alarm.submission) {
            // 잘 제출 한 경우
            let type = document.createElement("div")
            type.className ="type"
            type.innerHTML= "체크시트 제출 확인"
            item.appendChild(type)

            let description = document.createElement("div")
            description.className = "description"
            description.innerHTML = alarm.submissionLocation + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
            item.appendChild(description)
        }
        else {
            // 위치가 다른 경우
            item.classList.add("wrong")

            let type = document.createElement("div")
            type.className ="type yellow"
            type.innerHTML= "잘못된 위치에서 체크시트 제출"
            item.appendChild(type)

            let description = document.createElement("div")
            description.className = "description"
            description.innerHTML = alarm.submissionLocation + " 위치에서 " + alarm.properLocation + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
            item.appendChild(description)
        }
    }
    else if(alarm.type == "warning") {
        item.classList.add("wrong")

        let type = document.createElement("div")
        type.className ="type yellow"
        type.innerHTML= "경고"
        item.appendChild(type)

        let description = document.createElement("div")
        description.className ="description"
        description.innerHTML= alarm.location + " 위치의 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요" 
        item.appendChild(description)
    }
    else if(alarm.type == "attendance") {
        let type = document.createElement("div")
        type.className ="type"
        type.innerHTML= "출석 확인"
        item.appendChild(type)

        let description = document.createElement("div")
        description.className ="description"
        description.innerHTML= alarm.session + " 출석 확인"
        item.appendChild(description)
        
    }

    let time = document.createElement("div")
    time.className = "time"
    time.innerHTML = alarm.time
    item.appendChild(time)

    body.appendChild(item)
    
})