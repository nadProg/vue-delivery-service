<template>
  <div
    :class="blockClass"
    role="radiogroup"
    :aria-label="element.header"
  >
    <h2>
      {{ element.header }}
    </h2>
    <template v-for="(input, index) of element.inputs">
      <input
        :id="id(input.value)"
        :key="inputKey(index)"
        v-model="inputModel"
        type="radio"
        :name="element.name"
        :value="input.value"
      >
      <label
        :key="labelKey(index)"
        :for="id(input.value)"
      >
        <span>{{ input.label }}</span>
        <svg
          width="288"
          height="78"
        >
          <use :href="iconHash(input.value)" />
        </svg>
      </label>
    </template>
  </div>
</template>
<script>
import MixinTabs from './MixinTabs.vue';

export default {
  name: 'BaseFilterTabs',
  mixins: [MixinTabs],
};
</script>
