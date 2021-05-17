let CheckSheet = document.querySelector("#CheckSheet");
let CheckSheetList = document.querySelector("#CheckSheetList");
let BeaconMornitor = document.querySelector("#BeaconMornitor");
let WorkerAlarm = document.querySelector("#WorkerAlarm");
let BeaconManagement = document.querySelector("#BeaconManagement");

let userInfo = null;
CheckSheet.addEventListener("click", moveCheckSheet);
CheckSheetList.addEventListener("click", moveCheckSheetList);
BeaconMornitor.addEventListener("click", moveBeaconMornitor);
WorkerAlarm.addEventListener("click", moveWorkerAlarm);
BeaconManagement.addEventListener("click", moveBeaconManagement);
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
  localStorage.clear();
  setTimeout(() => {
    window.location = "../login/login.html";
  }, 1000);
}
function moveCheckSheet() {
  window.location = "../checklist/checklist.html";
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

function load() {
  userInfo = window.localStorage.getItem("userInfo");
  console.log(JSON.parse(userInfo));
  userInfo = JSON.parse(userInfo);
}

window.onload = load;
