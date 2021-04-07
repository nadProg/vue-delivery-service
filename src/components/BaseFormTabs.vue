<template>
  <div>
    <h3 v-if="element.sectionHeader">
      {{ element.sectionHeader }}
    </h3>
    <div
      class="input-wrapper input-wrapper--radio-group"
      role="radiogroup"
      :aria-label="element.header || element.sectionHeader"
    >
      <h4 v-if="element.header">
        {{ element.header }}
      </h4>
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
        </label>
      </template>
    </div>
  </div>
</template>
<script>
import MixinTabs from './MixinTabs';

export default {
  name: 'BaseFormTabs',
  mixins: [MixinTabs],
};
</script>
