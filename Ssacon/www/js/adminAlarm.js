document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
  setInterval(() => {
    alarm()
  }, 3000)
}

function alarm() {
  console.log('관리자 알림');
  const userID = JSON.parse(window.localStorage.getItem("userInfo")).data.userId
  fetch(`http://k4b101.p.ssafy.io/api/alarm/admin/${userID}`, {
    method:'GET',
  })
  .then((response) => { 
      return response.json();
  })
  .then((result) => {
    console.log(result.data);
    let alarmlist = result.data
    let items = []
    if(alarmlist) {
      alarmlist.forEach((alarm) => {
        let item = {}
        let title;
        let description;
        let icon;
        if(alarm.type == "takeover") {
            title = "인수 인계"
            description = alarm.line+ " " + alarm.equipment+ " " + alarm.description + " - " + alarm.writer
            icon="res://info.png"                }
        else if(alarm.type == "checksheet") {
            if(alarm.properBeaconId == alarm.submissionBeaconId) {
                // 잘 제출 한 경우
                title = "체크시트 제출 확인"
                description = alarm.submissionBeaconId + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                icon="res://success.png"                    }
            else {
                title = "잘못된 위치에서 체크시트 제출"
                description = alarm.submissionBeaconId + " 근처에서 " + alarm.properBeaconId + " 위치의 " + alarm.equipment + " 설비 체크시트 제출 확인"
                icon="res://warning.png"
            }
        }
        else if(alarm.type == "warning") {
            title = "위험"
            description = alarm.beaconId + " 위치의 " + alarm.equipment + "설비 온도가 적정범위를 벗어났습니다. 점검해주세요" 
            icon="res://danger.png"
        }
        else if(alarm.type == "attendance") {
            title= "출석 확인"
            description = alarm.session + " 출석 확인"
            icon="res://success.png"
        }
        else if(alarm.type == "battery") {
            title="비콘 배터리 잔량 부족"
            description = alarm.line+ " " + alarm.beaconId + " 위치 " + 
            alarm.equipment + " 비콘 배터리 잔량이 " + alarm.battery + 
            "%입니다. 점검해주세요."
            icon="res://danger.png"
        }
        item["id"] = alarm.id
        item["title"] = title
        item["text"] = description
        item["icon"] = icon
        item["foreground"] = true
        items.push(item)
      })
    }
      // 이제 알람 띄움
    if(items){
      cordova.plugins.notification.local.schedule(items)
      cordova.plugins.notification.local.on('click', function(notification) {
          // console.log(notification)
          window.location = "file:///android_asset/www/template/alarm/alarmdetail.html" + "?id=" + notification.id ;
      })
      if(!cordova.plugins.backgroundMode.isActive()) {
        if(items.length == 1) {
          window.location = "file:///android_asset/www/template/alarm/alarmdetail.html" + "?id=" + items[0].id ;
        } else if(items.length > 1) {
          window.location = "file:///android_asset/www/template/alarm/alarmlist.html"
        }
      }
    }
    beaconList = []
  })
  .catch((error) => {
    console.error(error)
  })
}