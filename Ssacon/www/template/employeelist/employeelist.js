let WorkerAlarm = document.querySelector("#WorkerAlarm");
let WorkerCheckSheet = document.querySelector("#WorkerCheckSheet");
let WorkerMessage = document.querySelector("#WorkerMessage");

// let header = document.querySelector("#header");
// let admin = document.querySelector("#admin");
// let worker = document.querySelector("#worker");
let userInfo = null;
WorkerAlarm.addEventListener("click", moveWorkerAlarm);
WorkerCheckSheet.addEventListener("click", moveWorkerCheckSheet);
WorkerMessage.addEventListener("click", moveWorkerMessage);
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
  localStorage.clear();
  setTimeout(() => {
    window.location = "../login/login.html";
  }, 1000);
}
function moveWorkerAlarm() {
  window.location = "../alarm/alarmlist.html";
}

function moveWorkerCheckSheet() {
  console.log(WorkerCheckSheet);
  window.location = "../sheetlist/sheetlist.html";
}
function moveWorkerMessage() {
  window.location = "../message/message.html";
}

function load() {
  userInfo = window.localStorage.getItem("userInfo");
  console.log(JSON.parse(userInfo));
  userInfo = JSON.parse(userInfo);
}

window.onload = load;
