<template>
  <div
    class="modal"
    role="alert"
  >
    <div
      class="modal__background"
      @click="$emit('close')"
    />
    <div class="modal__window">
      <p class="modal__message">
        <slot />
      </p>
      <button
        class="modal__btn"
        :class="buttonStatus"
        type="button"
        @click="$emit('close')"
      >
        OK
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseModal',
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    buttonStatus() {
      return `modal__btn--${this.status}`;
    },
  },
  created() {
    this.windowHandler = this.windowHandler.bind(this);
    window.addEventListener('keydown', this.windowHandler);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.windowHandler);
  },
  methods: {
    windowHandler({code}) {
      switch (code) {
        case 'Escape':
        case 'Space':
        case 'Enter':
          this.$emit('close');
          break;

        default:
          break;
      }
    },
  },
};
</script>
