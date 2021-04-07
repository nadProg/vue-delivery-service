<template>
  <BaseMap
    :coords="coords"
    :markers="markers"
    :switch-mode="switchMode"
    base="map"
  />
</template>
<script>
import { mapState, mapGetters } from 'vuex';

import BaseMap from './BaseMap.vue';

export default {
  name: 'TheMap',
  components: {
    BaseMap,
  },
  data: () => ({
    prevCity: '',
    switchMode: '',
  }),
  computed: {
    ...mapState('form', {
      currentCity: (state) => state.city.value,
    }),
    ...mapState(['pickupPointMap']),
    ...mapGetters(['coords']),
    markers() {
      return Object.values(this.pickupPointMap);
    },
  },
  watch: {
    coords: {
      handler() {
        this.switchMode =
          this.prevCity === this.currentCity ? 'flyTo' : 'panTo';
        this.prevCity = this.currentCity;
      },
      immediate: true,
    },
  },
  created() {
    this.prevCity = this.currentCity;
  },
};
</script>
