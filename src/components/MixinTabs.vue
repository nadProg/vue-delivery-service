<script>
export default {
  name: 'MixinTabs',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  computed: {
    base() {
      return `${this.element.name}-tab`;
    },
    blockClass() {
      return `${this.base}s`;
    },
    inputModel: {
      get() {
        return this.element.value;
      },
      set(value) {
        this.$emit('updateValue', {
          value,
          name: this.element.name,
        });
      },
    },
  },
  methods: {
    id(value) {
      return `${this.base}-${value}`;
    },
    inputKey(index) {
      return `${this.id}-input-${index}`;
    },
    labelKey(index) {
      return `${this.id}-label-${index}`;
    },
    iconHash(value) {
      return `#${this.base}-${value}-icon`;
    },
  },
};
</script>
