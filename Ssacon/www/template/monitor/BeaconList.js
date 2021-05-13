let data;
let nonSignalWorker, onSignalWorker;
let BeaconList = new Array();
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

function getData() {
  fetch("http://k4b101.p.ssafy.io/api/monitoring/beacon", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result  : ", result);
      data = result.data;
      console.log("fetch data  :", data);
      return data;
    })
    .then((data) => {
      getBeacon(data);
    })
    .catch((error) => console.log("error", error));
}

function getBeacon(data) {
  console.log("after data  :", data);
  for (let i = 0; i < data.length; i++) {
    let card = { Beacon: data[i] };
    BeaconList.push(card);
  }
  renderBeacon();
  console.log("BeaconList  :", BeaconList);
}

function renderBeacon() {
  document.getElementById("BeaconList").innerHTML = "";
  for (let i = 0; i < BeaconList.length; i++) {
    let card = document.createElement("div");
    let name = document.createElement("div");
    card.className = "card";
    card.innerHTML = BeaconList[i].Beacon.beaconName;
    function selectBeacon() {
      let selectedBeacon = BeaconList[i].Beacon;
      renderSession(selectedBeacon);
    }
    card.addEventListener("click", selectBeacon);
    document.getElementById("BeaconList").appendChild(card);
  }
}

function renderSession(selectedBeacon) {
  document.getElementById("BeaconStatus").innerHTML = "";
  let WorkerList = document.createElement("div");
  let table = document.createElement("table");
  table.className = "table";
  WorkerList.className = "worker";
  let row = `
  <tr> <th>Beacon</th> <th>습도</th> <th>온도</th> </tr>
  <tr> 
    <td>${selectedBeacon.beaconName}
    </td> <td>${selectedBeacon.beaconMoisture}</td> 
    <td>${selectedBeacon.beaconTemperature}</td> 
    </tr>`;
  console.log(selectedBeacon.connectWorkers);
  table.innerHTML = row;
  for (let i = 0; i < selectedBeacon.connectWorkers.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = selectedBeacon.connectWorkers[i].userName;
    WorkerList.appendChild(card);
  }
  document.getElementById("BeaconStatus").appendChild(table);
  document.getElementById("BeaconStatus").appendChild(WorkerList);
}
// -----------------------------------------------------------------------------------비콘 pie graph
function getWorkerStatusData() {
  fetch("http://k4b101.p.ssafy.io/api/monitoring/workerstatus", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      nonSignalWorker = result.data.nonSignalWorker.length;
      onSignalWorker = result.data.onSignalWorker.length;
      console.log(nonSignalWorker, onSignalWorker);
      return nonSignalWorker, onSignalWorker;
    })
    .then(() => {
      var obj = {
        values: [nonSignalWorker, onSignalWorker],
        colors: ["#4CAF50", "#00BCD4", "#E91E63", "#FFC107", "#9E9E9E"],
        animation: true,
        animationSpeed: 0,
        fillTextData: true,
        fillTextColor: "#fff",
        fillTextPosition: "inner",
        doughnutHoleSize: null,
        doughnutHoleColor: "#fff",
        offset: 0,
      };
      generatePieGraph("myCanvas", obj);
    });
}

async function load() {
  getData();
  getWorkerStatusData();
  // getBeacon(data);
}

window.onload = load;
