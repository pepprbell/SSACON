document.getElementById("beacon_c_butt").addEventListener("click", goBeaconCreate);
document.getElementById("beacon_ud_butt").addEventListener("click", goBeaconUpdateDele);

function goBeaconCreate() {
  window.location = "../beacon_c/beacon_c.html";
}

function goBeaconUpdateDele() {
  window.location = "../beacon_ud/beacon_ud.html";
}