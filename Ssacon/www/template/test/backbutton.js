var app = {
  initialize: function() {
      this.bindEvents();
  },

  bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
      document.getElementById("backbutton").addEventListener("click", this.gobackPage.bind(this))
  },

  onDeviceReady: function() {
      console.log('test Page');
  },

  gobackPage: function() {
      window.history.back();
  },
}

app.initialize()

