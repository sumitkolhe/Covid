const endpoint = "https://api.covid19india.org/data.json";

new Vue({
  el: "#app",

  data() {
    return {
      helo: "hello",
      results: [],
      today: new Date().toLocaleDateString(),
      newdata: [],
      timestamp: "",
    };
  },

  created() {
    axios.get(endpoint).then((response) => {
      this.results =
        response.data.cases_time_series[
          response.data.cases_time_series.length - 1
        ];
      this.timestamp =
        response.data.tested[response.data.tested.length - 1].updatetimestamp;

      this.deleteele();
      this.newdata = this.changecase(this.results);
    });
  },

  methods: {
    deleteele() {
      delete this.results["date"];
    },

    changecase(json) {
      var keys = Object.keys(json);

      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var value = json[key];
        delete json[key];
        key = jsConvert.toSentenceCase(
          key.substring(0, 5) + " " + key.substring(5)
        );
        json[key] = value;
      }
      return json;
    },
  },
});
