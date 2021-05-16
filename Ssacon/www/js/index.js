var app = {
<<<<<<< HEAD
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
        document.getElementById("worker").addEventListener("click", this.goWorkerPage.bind(this))
        document.getElementById("manager").addEventListener("click", this.goManagerPage.bind(this))
        document.getElementById("loginpage").addEventListener("click", this.goLoginPage.bind(this))
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

    goLoginPage: function() {
        window.location = "./template/login/login.html";
    },
}

app.initialize()
window.app = ap
=======
  initialize: function () {
    this.bindEvents();
  },

  bindEvents: function () {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
    document
      .getElementById("worker")
      .addEventListener("click", this.goWorkerPage.bind(this));
    document
      .getElementById("manager")
      .addEventListener("click", this.goManagerPage.bind(this));
    document
      .getElementById("loginpage")
      .addEventListener("click", this.goLoginPage.bind(this));
  },

  onDeviceReady: function () {
    console.log("firstPage");
  },

  goWorkerPage: function () {
    window.location = "./template/testrouter/testrouter.html";
  },

  goManagerPage: function () {
    window.location = "./template/monitor/monitor.html";
  },

  goLoginPage: function () {
    window.location = "./template/login/login.html";
  },
};

app.initialize();
window.app = ap;
>>>>>>> af7387a7fcb5690969d2e02fa1dc53336284e099
