<template>
  <div class="input-wrapper input-wrapper--range">
    <h4>{{ element.header }}</h4>
    <input
      :name="element.name"
      :value="element.value"
      type="hidden"
    >
    <VueSlider
      v-model="sliderModel"
      style="padding: 0"
      :min="element.min"
      :max="element.max"
      :interval="element.interval"
      :tooltip="tooltip"
      :width="width"
      :height="height"
      :dot-size="dotSize"
      :dot-attrs="dotAttrs"
    >
      <template v-slot:tooltip="{ value }">
        <div class="vue-slider-custom-tooltip">
          {{ value | formatTimeRange }}
        </div>
      </template>
      <template #dot>
        <div class="vue-slider-dot-handle">
          <div class="vue-slider-custom-dot-stripe" />
          <div class="vue-slider-custom-dot-stripe" />
          <div class="vue-slider-custom-dot-stripe" />
        </div>
      </template>
      <template #process>
        <div class="vue-slider-custom-marks">
          <div
            v-for="(mark, index) of element.marks"
            :key="`vue-slider-mark-${index + 1}`"
            class="vue-slider-custom-mark"
          >
            {{ mark }}
          </div>
        </div>
      </template>
    </VueSlider>
  </div>
</template>
<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

import throttle from '@/utils/throttle';

export default {
  name: 'BaseSlider',
  components: {
    VueSlider,
  },
  filters: {
    formatTimeRange(val) {
      const min = val % 1 ? '30' : '00';
      const hour = parseInt(val);
      return `${hour}:${min} - ${hour + 2}:${min}`;
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tooltip: 'always',
      width: 484,
      height: 8,
      dotSize: [108, 8],
      staticDotAttr: {
        'aria-valuemin': this.element.min,
        'aria-valuemax': this.element.max,
      },
    };
  },
  computed: {
    sliderModel: {
      get() {
        return this.element.value;
      },
      set(value) {
        this.emitChangeVal(value);
      },
    },
    dotAttrs() {
      return {
        ...this.staticDotAttr,
        'aria-valuenow': this.sliderModel,
      };
    },
  },
  mounted() {
    this.emitChangeVal = throttle(this.emitChangeVal, 500);
  },
  methods: {
    emitChangeVal(value) {
      this.$emit('updateValue', { name: this.element.name, value });
    },
  },
};
</script>
<style lang="scss">
.vue-slider {
  margin-top: 42px;
  background: #f2f2f2;
  border-radius: 4px;
}

.vue-slider-rail {
  width: 376px;
  margin: 0 auto;
  background: none;
}

.vue-slider-dot:focus {
  animation: var(--animation-focus);;
}

.vue-slider-dot-handle {
  background: var(--color-btn-base);
  border-radius: 5px;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-slider-custom-tooltip {
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: -30px;
  transform: translateX(-50%);
  text-align: center;
  padding: 4px 0;
  width: 99px;
  height: 28px;
  background: var(--color-blue);
  border-radius: 4px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-white);
  user-select: none;
}

.vue-slider-custom-tooltip:after {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: transparent;
  border-top-color: var(--color-blue);
  border-width: 5px;
  margin-left: -5px;
}

.vue-slider-custom-dot-stripe {
  display: block;
  margin: 0 2px;
  width: 2px;
  height: 4px;
  background: var(--color-white);
  border-radius: 1px;
}

.vue-slider-custom-marks {
  position: absolute;
  width: 475px;
  left: 50%;
  transform: translate3d(-50%, 15px, 0);
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-grey);
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vue-slider-custom-mark {
  cursor: pointer;
}
</style>
