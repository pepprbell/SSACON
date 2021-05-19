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
      beaconAll = result.data;
      // ------------------------------------------------------------pie chart area
      console.log(beaconAll);
      totalLoginWorker = beaconAll.totalLoginWorker.length;
      nonSignalWorker = beaconAll.nonSignalWorker.length;
      onSignalWorker = beaconAll.onSignalWorker.length;
      var myDougnutChart = new Piechart({
        canvas: myCanvas,
        data: { 근무중: onSignalWorker, 자리이탈: nonSignalWorker },
        colors: ["#3F72BE", "#ff0000", "#57d9ff", "#937e88"],
        doughnutHoleSize: 0.5,
        legend: myLegend,
      });
      myDougnutChart.draw();
      // total = document.getElementById("total");
      // let totalHTML = "";
      // totalHTML +=
      //   "<div><span style='display:inline-block;width:20px;background-color: black" +
      //   ";'>&nbsp;</span> " +
      //   " TOTAL " +
      //   `${totalLoginWorker} 명` +
      //   "</div>";
      // total.innerHTML = totalHTML;
      // ----------------------------------------------------------pit chart area end
    })
    .then((data) => {
      console.log("data : ", data);
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
  console.log(1);
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
// --- Piechart start
let myCanvas = document.getElementById("myCanvas");
var total = document.getElementById("total");

var ctx = myCanvas.getContext("2d");
function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.stroke();
}
function drawPieSlice(
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

// slice angle = 2 * PI * category value / total value
var Piechart = function (options) {
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;
  this.legend = options.legend;

  this.draw = function () {
    var total_value = 0;
    var color_index = 0;
    for (var categ in this.options.data) {
      var val = this.options.data[categ];
      total_value += val;
    }

    var start_angle = 0;
    for (categ in this.options.data) {
      val = this.options.data[categ];
      var slice_angle = (2 * Math.PI * val) / total_value;

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );

      start_angle += slice_angle;
      color_index++;
    }

    //drawing a white circle over the chart
    //to create the doughnut chart
    if (this.options.doughnutHoleSize) {
      start_angle = 0;
      for (categ in this.options.data) {
        val = this.options.data[categ];
        slice_angle = (2 * Math.PI * val) / total_value;
        var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
        var labelX =
          this.canvas.width / 2 +
          (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
        var labelY =
          this.canvas.height / 2 +
          (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

        if (this.options.doughnutHoleSize) {
          var offset = (pieRadius * this.options.doughnutHoleSize) / 2;
          labelX =
            -15 +
            this.canvas.width / 2 +
            (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
          labelY =
            +this.canvas.height / 2 +
            (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
        }

        var labelText = Math.round(val);
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 1vw Arial";
        this.ctx.fillText(labelText + "명", labelX, labelY);
        start_angle += slice_angle;
      }
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize *
          Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        "#ffffff'"
      );
      if (this.options.legend) {
        color_index = 0;
        let legenddiv = document.createElement("div");
        legenddiv.className = "mylegend";
        var legendHTML = "";
        for (categ in this.options.data) {
          legendHTML +=
            "<span style='display:inline-block;width:20px; height:20px; border-radius:100px; font-size : 1vw; background-color:" +
            this.colors[color_index++] +
            ";'>&nbsp;</span> " +
            categ;
        }
        legenddiv.innerHTML = legendHTML;
        this.options.legend.appendChild(legenddiv);
      }
    }
  };
};
async function load() {
  getData();
}

window.onload = load;
