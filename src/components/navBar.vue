<template>
  <div>
    <v-app-bar color="primary" class="centered bg-header" dark app tabs prominent>
      <v-container class="mx-0 px-0" fluid>
        <v-row class="mx-0 px-0">
          <v-col cols="10" xs="8" sm="9" md="10">
            <v-row justify="space-between" class="mx-0 px-0">
              <v-col cols="2" xs="12" sm="12" md="2" lg="2" xl="2">
                <div
                >
                 <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/bf/Logo_HUET.svg/1200px-Logo_HUET.svg.png" width='150px' />
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="10" lg="10">
                <div
                  class="text-xl-h2 text-sm-h3 font-weight-black text-no-wrap title-css"
              >
                  Hệ thống giám sát địa chấn đại dương
                </div>
              </v-col>
              <v-spacer />
            </v-row>
          </v-col>
          <v-spacer />
          <!-- <v-col cols="4" xs="4" sm="3" md="2">
            <div class="float-right">
            
              <div>Icon Avatar-Author</div>
            </div>
          </v-col> -->
        </v-row>
      </v-container>

      <v-tabs slot="extension" v-model="active" grow>
        <v-tabs-slider color="accent"></v-tabs-slider>

        <v-tab v-for="route in routes" :key="route.name" :to="route.path">
          {{ route.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
  </div>
</template>

<script>
// import SocketIO from "socket.io-client";
import axios from 'axios';
export default {
  components: {
  },
  sockets: {
    connect() {
      this.statusColor = "secondary";
      this.statusIcon = "mdi-wifi-strength-4";
    },
    disconnect() {
      this.statusColor = "red";
      this.statusIcon = "mdi-alert-circle";
    },
  },
  data() {
    // console.log("this.$router.options.routes", this.$router.options.routes);
    return {
      piUrl: this.$store.state.piUrl,
      piUrlSet: true,
      routes: this.$router.options.routes.map((route) => ({
        name: route.name,
        path: route.path,
      })),
      active: null,
      text: "Live updates received",
      statusIcon: "mdi-alert-circle",
      statusColor: "red",
      drawer: null,
    };
  },
  methods: {
    drawerToggle: function() {
      this.drawer = !this.drawer;
    },
    setUrl() {
      this.piUrlSet = true;
      this.$refs.addressbar.blur();
      const urlObj = new URL(this.piUrl);
      console.log("urlObj", urlObj);
      this.$store.commit("updatePiUrl", this.piUrl);
    },
    editUrl() {
      this.piUrlSet = false;
    },

  },
};
</script>
<style scoped>
.bg-header {
  background-image: url("https://img.pikbest.com/ai/illus_our/20230423/b197187bdb30a52e61dbe0bdb4ac9d82.jpg!w700wp");
  background-size: cover;
  background-position: center;
}
.title-css {
  text-align: end;
}
</style>
