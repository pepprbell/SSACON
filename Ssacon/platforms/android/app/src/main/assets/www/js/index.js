var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
        document.getElementById("worker").addEventListener("click", this.goWorkerPage.bind(this))
        document.getElementById("manager").addEventListener("click", this.goManagerPage.bind(this))
        document.getElementById("TestPage").addEventListener("click", this.goTestPage.bind(this))
    },

    onDeviceReady: function() {
        console.log('firstPage');
    },

    goWorkerPage: function() {
        window.location = "./template/testrouter/testrouter.html";
    },

    goManagerPage: function() {
        window.location = "./template/monitor/monitor.html";
    },

    goTestPage: function() {
        window.location = "./template/beacon/beacon_crud/beacon_crud.html";
    },
}

app.initialize()