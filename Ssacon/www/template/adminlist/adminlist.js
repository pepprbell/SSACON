let CheckSheet = document.querySelector("#CheckSheet");
let CheckSheetList = document.querySelector("#CheckSheetList");
let BeaconMornitor = document.querySelector("#BeaconMornitor");
let WorkerAlarm = document.querySelector("#WorkerAlarm");
let BeaconManagement = document.querySelector("#BeaconManagement");
let userInfo = window.localStorage.getItem("userInfo");
userInfo = JSON.parse(userInfo);
CheckSheet.addEventListener("click", moveCheckSheet);
CheckSheetList.addEventListener("click", moveCheckSheetList);
BeaconMornitor.addEventListener("click", moveBeaconMornitor);
WorkerAlarm.addEventListener("click", moveWorkerAlarm);
BeaconManagement.addEventListener("click", moveBeaconManagement);
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
  // /user/logout/{userId}
  let userId = userInfo.data.userId;
  console.log(userId);
  fetch(`http://k4b101.p.ssafy.io/api/user/logout/${userId}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("로그아웃됐나?");
      localStorage.clear();
      setTimeout(() => {
        window.location = "../login/login.html";
      }, 1000);
    })
    .catch((error) => console.log("error", error));
}
function moveCheckSheet() {
  window.location = "../sheetlist/sheetlist.html";
}
function moveCheckSheetList() {
  window.location = "../seeChecklist/seeChecklist.html";
}
function moveBeaconMornitor() {
  window.location = "../monitor/monitor.html";
}
function moveWorkerAlarm() {
  window.location = "../alarm/alarmlist.html";
}
function moveBeaconManagement() {
  window.location = "../beacon_crud/beacon_crud.html";
}

function load() {}

window.onload = load;
