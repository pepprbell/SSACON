let data;
let BeaconList = new Array();
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

function getData() {
  fetch("http://k4b101.p.ssafy.io/api/monitoring/beacon", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log('result  : ',result)
    data = result.data
    console.log("fetch data  :" , data)
    return data;
  })
  .then((data) => {
    getBeacon(data);
  })
  .catch((error) => console.log("error", error));
  
}


function getBeacon(data) {
  console.log("after data  :" , data)
  for (let i = 0; i < data.length; i++) {
    let card = { Beacon: data[i] };
    BeaconList.push(card);
  }
  renderBeacon();
  console.log('BeaconList  :', BeaconList);
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
  console.log(selectedBeacon.workers);
  table.innerHTML = row;
  for (let i = 0; i < selectedBeacon.workers.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = selectedBeacon.workers[i].userName;
    WorkerList.appendChild(card);
  }
  document.getElementById("BeaconStatus").appendChild(table);
  document.getElementById("BeaconStatus").appendChild(WorkerList);
}

async function load() {
  getData();
  // getBeacon(data);
  
}

window.onload = load;
