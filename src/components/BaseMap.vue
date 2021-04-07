<template>
  <div
    ref="leaflet"
    class="leaflet"
    :class="base"
  >
    <l-map
      ref="map"
      :zoom="zoom"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker
        v-for="(marker, index) of markers"
        :key="markerKey(index)"
        :lat-lng="marker"
        tabindex="-1"
        :options="{ keyboard: false }"
      />
    </l-map>
  </div>
</template>
<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: null,
  iconUrl: require('@/assets/img/icon/icon-location.svg'),
  shadowUrl: null,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default {
  name: 'BaseMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    coords: {
      type: Array,
      required: true,
    },
    markers: {
      type: Array,
      required: true,
    },
    switchMode: {
      type: String,
      default: 'panTo',
    },
    base: {
      type: String,
      default: 'leaflet',
    },
  },
  data: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    zoom: 15,
  }),
  watch: {
    coords: {
      handler(value) {
        this.$nextTick(() => {
          this.$refs.map.mapObject.setZoom(this.zoom);
          this.$refs.map.mapObject[this.switchMode](value, this.zoom, {
            duration: 1,
          });
        });
      },
      immediate: true,
    },
  },
  mounted() {
    const links = this.$refs.leaflet.querySelectorAll('a');
    links.forEach((link) => {
      link.tabIndex = '-1';
    });
  },
  methods: {
    markerKey(index) {
      return `${this.base}-marker-${index}`;
    },
  },
};
</script>
<style>
.leaflet {
  background: none;
}
.leaflet-container:focus {
  animation: var(--animation-focus);
}

.leaflet-control a:focus {
  animation: var(--animation-focus);
  outline: none;
}
</style>
