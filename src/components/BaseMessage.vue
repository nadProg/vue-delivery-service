<template>
  <p
    :class="classList"
    role="alert"
  >
    <slot />
  </p>
</template>
<script>
export default {
  name: 'BaseMessage',
  props: {
    status: {
      type: String,
      default: 'info',
    },
  },
  data: () => ({
    base: 'message',
  }),
  computed: {
    statusClass() {
      return `${this.base}--${this.status}`;
    },
    classList() {
      return [this.base, this.statusClass];
    },
  },
};
</script>
