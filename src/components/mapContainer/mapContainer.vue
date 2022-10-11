<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default defineComponent({
  props: {
    collapse: {
      default: true,
      type: Boolean
    }
  },
  setup() {
    onMounted(() => {
      var map = L.map('map').setView([51.505, -0.09], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 4,
        attribution: '© OpenStreetMap'
      }).addTo(map)
    })
    return {}
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  z-index: 1;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
