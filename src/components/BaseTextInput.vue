<template>
  <div :class="classList">
    <h4>
      {{ element.header }}
    </h4>
    <input
      :id="element.name"
      v-imask="element.mask"
      :name="element.name"
      :value="element.value"
      :aria-invalid="!element.isValid"
      :aria-description="ariaDescription(element.errorMessage)"
      @accept="onAccept"
      @input="onInput"
    >
    <label
      :for="element.name"
      class="visually-hidden"
    >
      <slot name="ariaLabel" />
    </label>
    <div
      aria-hidden="true"
      :class="errorBlockClass"
      v-html="element.errorMessage"
    />
  </div>
</template>
<script>
import { IMaskDirective } from 'vue-imask';

import htmlToText from '@/utils/htmlToText';

export default {
  name: 'BaseTextInput',
  directives: {
    imask: IMaskDirective,
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    base: 'input-wrapper',
  }),
  computed: {
    typeClass() {
      return `${this.base}--input`;
    },
    validityClass() {
      return this.element.isValid
        ? `${this.base}--success`
        : `${this.base}--error`;
    },
    errorBlockClass() {
      return `${this.base}__error`;
    },
    classList() {
      return [this.base, this.typeClass, this.validityClass];
    },
  },
  methods: {
    onInput({ currentTarget }) {
      if (!this.element.mask) {
        this.$emit('updateValue', this.payload(currentTarget.value));
      }
    },
    onAccept({ detail }) {
      if (this.element.mask) {
        this.$emit('updateValue', this.payload(detail.value));
      }
    },
    payload(value) {
      return {
        name: this.element.name,
        value: value,
      };
    },
    ariaDescription(html) {
      return htmlToText(html);
    },
  },
};
</script>
