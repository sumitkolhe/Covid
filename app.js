const endpoint = "https://api.rootnet.in/covid19-in/stats/latest";

new Vue({
  el: "#app",

  data() {
    return {
      helo: "hello",
      results1: [],
      today: new Date().toLocaleDateString(),
      summarydata: [],
      regionaldata:[],
      timestamp: "",
      date: "",
    };
  },

  created() {
    axios.get(endpoint).then((response) => {
      this.results1 = response.data.data['unofficial-summary'][0]; 
      this.results2 = response.data.data.regional; 
      this.timestamp = response.data.lastRefreshed;
      this.date = (new Date(this.timestamp).toLocaleDateString())+" "+(new Date(this.timestamp).toISOString().split("T")[1].split(".")[0]);
      this.deleteelement();
      this.summarydata = this.changecase(this.results1);
      console.log(this.results1);
      this.regionaldata = this.changecase(this.results2);
    });
  },

  methods: {
    deleteelement() {
      delete this.results1.source;

    },

    changecase(json) {
      var keys = Object.keys(json);

      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var value = json[key];
        delete json[key];
        key = jsConvert.toSentenceCase(key.substring(0));
        json[key] = value;
      }
      return json;
    },
  },
});
