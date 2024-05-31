import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';


import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client'

import VueGoogleCharts from 'vue-google-charts'
import * as VueGoogleMaps from 'vue2-google-maps'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import mapMakerIcon from './assets/map-maker.svg';

Vue.use(VueGoogleCharts)
Vue.use(VueRouter)

Vue.use(VueAxios, axios)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
    libraries: 'places',
  },
});
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

// Fix Leaflet's default icon issue with Vue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: mapMakerIcon,
  iconUrl: mapMakerIcon,
  shadowUrl: mapMakerIcon
});


export let SocketInstance = SocketIO(null,{
  autoConnect: false,
  transports: ['polling'],
  host: '0.0.0.0',
  port: 5000
});

Vue.use(new VueSocketIO({
    // debug: true,
    connection: SocketInstance,
    vuex: {
          store,
          actionPrefix: "SOCKET_",
          mutationPrefix: "SOCKET_"
        },
}))

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
