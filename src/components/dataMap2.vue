<template>
  <l-map
    :zoom="zoom"
    :center="center"
    style="height: 500px; width: 100%;"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <l-marker :lat-lng="center">
      <l-popup>Vị trí của bạn: {{ data.Latitude }}, {{ data.longtitude }}</l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        Latitude: '21.03838858548817',
        longtitude: '105.7826468098642'
      }),
    },
  },
  name: 'MapComponent',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      zoom: 13,
      center: [21.03838858548817, 105.7826468098642]
    };
  },
  watch: {
    data(val) {
      console.log('parseFloat', this.center)
      this.center = [parseFloat(this.data.Latitude), parseFloat(this.data.longtitude)]
      // this.center=[9.96729808880033, 105.67008903965568]
      console.log('chartTitlechartTitlechartTitle', this.center)
    }
  }
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
