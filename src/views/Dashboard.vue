<template>
  <div class="dashboard">
    <div ontouchstart="">
      <div class="button" @click="clickChangeDataButton">
        <a href="#">Trigger</a>
      </div>
      <div class="show-text">{{textShow}}</div>
    </div>
    <div class="dashboard-body" :v-if="measurements">
      <div v-for="measurement in measurements" :key="measurement">
        <!-- <data-map
          :name="measurement"
          v-if="measurement == 'location'"
        ></data-map>
        <data-card :name="measurement" v-else></data-card> -->
        <data-card :name="measurement"></data-card>
      </div>
    </div>
    <DataMap2 :data="gps" />
  </div>
</template>

<script>
import DataCard from "../components/dataCard.vue";
import DataMap from "../components/dataMap.vue";
import DataMap2 from "../components/dataMap2.vue";
import axios from "axios";

export default {
  name: "dashboard",
  components: {
    DataCard,
    DataMap,
    DataMap2
  },
  data() {
    return {
      textShow: 'Normal operation',
      measurements: this.$store.getters.measurementNames,
      diachan: "",
      temp: "",
      pressure: "",
      gps: "",
      current: "",
    };
  },
  mounted() {
    const fetchData = () => {
      axios
        .get(
          "https://smartbouy-14717-default-rtdb.asia-southeast1.firebasedatabase.app/diachan.json"
        )
        .then((response) => {
          this.diachan = response.data;
          // this.$store.dispatch('updateDataMeasurements', response.data)
        })
        .catch((error) => {
          console.error("Error fetching diachan:", error);
        });
      axios
        .get(
          "https://smartbouy-14717-default-rtdb.asia-southeast1.firebasedatabase.app/temp.json"
        )
        .then((response) => {
          this.temp = response.data;
          // this.$store.dispatch('updateDataMeasurements', response.data)
        })
        .catch((error) => {
          console.error("Error fetching diachan:", error);
        });
      axios
        .get(
          "https://smartbouy-14717-default-rtdb.asia-southeast1.firebasedatabase.app/pressure.json"
        )
        .then((response) => {
          this.pressure = response.data;
          // this.$store.dispatch('updateDataMeasurements', response.data)
        })
        .catch((error) => {
          console.error("Error fetching diachan:", error);
        });
      axios
        .get(
          "https://smartbouy-14717-default-rtdb.asia-southeast1.firebasedatabase.app/gps.json"
        )
        .then((response) => {
          this.gps = response.data;
          // this.$store.dispatch('updateDataMeasurements', response.data)
        })
        .catch((error) => {
          console.error("Error fetching diachan:", error);
        });
        axios
        .get(
          "https://smartbouy-14717-default-rtdb.asia-southeast1.firebasedatabase.app/current.json"
        )
        .then((response) => {
          this.current = response.data;
          // this.$store.dispatch('updateDataMeasurements', response.data)
        })
        .catch((error) => {
          console.error("Error fetching diachan:", error);
        });
      console.log("temp_tung::: ", {
        ...this.diachan,
        ...this.temp,
        ...this.pressure,
        ...this.gps,
        ...this.current
      });
      this.$store.dispatch("updateDataMeasurements", {
        ...this.diachan,
        ...this.temp,
        ...this.pressure,
        ...this.gps,
        ...this.current,
      });
    };

    fetchData();
    setInterval(fetchData, 1000);
  },
  methods: {
    clickChangeDataButton() {
      axios
        .put(
          "https://smartbouy-14717-default-rtdb.asia-southeast1.firebasedatabase.app/button/nhaneo.json",
          {
            data: 1, // Giá trị mới bạn muốn đặt cho trường nhaneo
          }
        )
        .then((response) => {
          this.textShow = 'Releasing OBS'
          console.log("Trường X đã được cập nhật thành 1 trên Firebase.");
          setTimeout(() => {
            axios
              .put(
                "https://smartbouy-14717-default-rtdb.asia-southeast1.firebasedatabase.app/button/nhaneo.json",
                {
                  data: 0, // Đặt giá trị của trường nhaneo thành 0
                }
              )
              .then((response) => {
                console.log(
                  "Trường nhaneo đã được cập nhật thành 0 trên Firebase sau 10 giây."
                );
              })
              .catch((error) => {
                console.error("Lỗi khi cập nhật trường X:", error);
              });
          }, 5000); // 10000 miligiây = 10 giây
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật trường nhaneo:", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  .dashboard-body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 100px 40px;
  }
}
.button-click-change-data {
  border: 1px solid #e3cbcb;
  background-color: #cdadd3;
  border-radius: 10px;
  padding: 5px;
  position: fixed;
  z-index: 100;
}
.button{
  position:fixed;
  // z-index: 100;
  display:inline-block;
  margin:20px;
  margin-left: 35%;
}
.show-text {
  position:fixed;
  // z-index: 100;
  display:inline-block;
  margin:20px;
  padding: 10px;
  margin-left: 45%;
  background-color: white;
  border-radius: 10px;
  width: 200px;
  height: 60px;
  text-align: center;
  font-size: 20px;
}

.button a{
  color:white;
  font-family:Helvetica, sans-serif;
  font-weight:bold;
  font-size:20px;
  text-align: center;
  text-decoration:none;
  background-color:#FFA12B;
  display:block;
  position:relative;
  padding:10px 25px;
  
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-shadow: 0px 1px 0px #000;
  filter: dropshadow(color=#000, offx=0px, offy=1px);
  
  -webkit-box-shadow:inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
  -moz-box-shadow:inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
  box-shadow:inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
  
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.button a:active{
  top:10px;
  background-color:#F78900;
  
  -webkit-box-shadow:inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
  -moz-box-shadow:inset 0 1px 0 #FFE5C4, inset 0 -3pxpx 0 #915100;
  box-shadow:inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
}

.button:after{
  content:"";
  height:100%;
  width:100%;
  padding:4px;
  position: absolute;
  bottom:-15px;
  left:-4px;
  z-index:-1;
  background-color:#2B1800;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</style>
