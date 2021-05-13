let CheckSheet = document.querySelector("#CheckSheet");
let CheckSheetList = document.querySelector("#CheckSheetList");
let BeaconMornitor = document.querySelector("#BeaconMornitor");
let AreaManagement = document.querySelector("#AreaManagement");
let BeaconManagement = document.querySelector("#BeaconManagement");
let WorkerCheckSheet = document.querySelector("#WorkerCheckSheet");
let WorkerMessage = document.querySelector("#WorkerMessage");
let header = document.querySelector("#header");
let admin = document.querySelector("#admin");
let worker = document.querySelector("#worker");
let userInfo = null;
CheckSheet.addEventListener("click", moveCheckSheet);
CheckSheetList.addEventListener("click", moveCheckSheetList);
BeaconMornitor.addEventListener("click", moveBeaconMornitor);
AreaManagement.addEventListener("click", moveAreaManagement);
BeaconManagement.addEventListener("click", moveBeaconManagement);
WorkerCheckSheet.addEventListener("click", moveWorkerCheckSheet);
WorkerMessage.addEventListener("click", moveWorkerMessage);

function moveCheckSheet() {
  window.location = "../checklist/checklist.html";
}
function moveCheckSheetList() {
  window.location = "../seeChecklist/seeChecklist.html";
}
function moveBeaconMornitor() {
  window.location = "../beaconMonitor/beaconMonitor.html";
}
function moveAreaManagement() {
  console.log('이거 삭제');
}
function moveBeaconManagement() {
  window.location = "../beacon_crud/beacon_crud.html";
}
function moveWorkerCheckSheet() {
  window.location = "../checklist/checklist.html";
}
function moveWorkerMessage() {
  window.location = "../message/message.html";
}

function load() {
  userInfo = window.localStorage.getItem("userInfo");
  console.log(JSON.parse(userInfo));
  userInfo = JSON.parse(userInfo);
  // userInfo.data.login = false; //test용
  if (userInfo.data.admin) {
    // 나중에 여길 근로자로 바꾸자
    header.innerHTML = "관리자 목록 ";
    WorkerCheckSheet.classList.add("enabled");
    WorkerMessage.classList.add("enabled");
  } else {
    header.innerHTML = "근무자 목록 ";
    CheckSheet.classList.add("enabled");
    CheckSheetList.classList.add("enabled");
    BeaconMornitor.classList.add("enabled");
    AreaManagement.classList.add("enabled");
    BeaconManagement.classList.add("enabled");
  }

  console.log(userInfo.data.userId);
  console.log(userInfo["data"]);
}

window.onload = load;
