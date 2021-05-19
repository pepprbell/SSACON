// webpack.config.js

const path = require('path')
// Set Root Path
const ROOT_PATH = path.resolve(__dirname, './')
const NODE_MODULE_PATH = '/node_modules/buildthing-ble-sdk/dist/'

//Target Platform
const CORDOVA_BUNDLE = 'buildthing.ble.cordova.js'


module.exports = {
  entry: {
    BeaconScan: './www/js/BeaconScan',
    BeaconAdd: './www/js/BeaconAdd',
  },
  // entry: ['./www/js/BeaconAdd'],
  module: {},
  output: {
		chunkFilename: '[name].js',
		filename: '[name]_bundle.js',
		// filename: 'bundle.js',
		path: path.resolve(__dirname, './www/dist/js')
	},
  resolve: {
    alias: {
      'buildthing-ble-sdk': ROOT_PATH + NODE_MODULE_PATH + CORDOVA_BUNDLE
    }
  }
}