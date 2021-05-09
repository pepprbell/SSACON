cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-background-mode.BackgroundMode",
      "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
      "pluginId": "cordova-plugin-background-mode",
      "clobbers": [
        "cordova.plugins.backgroundMode",
        "plugin.backgroundMode"
      ]
    },
    {
      "id": "cordova-plugin-ble-central.ble",
      "file": "plugins/cordova-plugin-ble-central/www/ble.js",
      "pluginId": "cordova-plugin-ble-central",
      "clobbers": [
        "ble"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-custom-config": "5.1.0",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-background-mode": "0.7.3",
    "cordova-plugin-ble-central": "1.3.1",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-androidx-adapter": "1.1.3"
  };
});