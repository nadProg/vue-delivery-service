<template>
  <component
    :is="component"
    :element="element"
    @updateValue="updateValue"
  />
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WrapperInput',
  components: {
    BaseSlider: () => import('./BaseSlider.vue'),
    BaseFormTabs: () => import('./BaseFormTabs.vue'),
    BaseTextInput: () => import('./BaseTextInput.vue'),
    BaseFilterTabs: () => import('./BaseFilterTabs.vue'),
  },
  props: {
    module: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getElement: 'element',
    }),
    element() {
      return this.getElement(this.module, this.name);
    },
    component() {
      switch (this.element.type) {
        case 'tabs':
          if (this.module === 'filter') {
            return 'BaseFilterTabs';
          }
          return 'BaseFormTabs';

        case 'slider':
          return 'BaseSlider';

        default:
          return 'BaseTextInput';
      }
    },
  },
  methods: {
    ...mapActions({ rootUpdateValue: 'updateValue' }),
    updateValue(payload) {
      this.rootUpdateValue({ ...payload, module: this.module });
    },
  },
};
</script>
