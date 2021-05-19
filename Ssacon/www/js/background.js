function onDeviceReady() {
  cordova.plugins.backgroundMode.enable();
  cordova.plugins.backgroundMode.overrideBackButton();
  cordova.plugins.backgroundMode.disableBatteryOptimizations();
  cordova.plugins.backgroundMode.excludeFromTaskList();
  cordova.plugins.backgroundMode.setDefaults({
    title: "앱이 백그라운드에서 작동중입니다.",
    text: "3초마다 정보를 보내고 받는 중입니다...",
  });
  cordova.plugins.backgroundMode.on("activate", function () {
    cordova.plugins.backgroundMode.disableWebViewOptimizations();
  });
}
document.addEventListener("deviceready", onDeviceReady, false);
