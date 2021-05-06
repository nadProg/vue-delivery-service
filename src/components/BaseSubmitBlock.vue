<template>
  <div class="form__submit-block">
    <button
      class="form__submit-btn"
      type="submit"
      :disabled="submitDisabled"
      @click.prevent="onClick"
    >
      Заказать
    </button>
    <div
      class="form__submit-state"
      aria-live="polite"
    >
      <BaseMessage
        v-if="isLoading"
        status="loading"
      >
        Идет отправка...
      </BaseMessage>
      <BaseSubmitHelp
        v-else-if="!isFormValid"
        class="form__submit-help"
        :missed-items="missedNames"
      />
    </div>
    <BaseModal
      v-if="modal.show"
      :status="modal.status"
      @close="$emit('close-modal')"
    >
      {{ modal.text }}
    </BaseModal>
  </div>
</template>
<script>
export default {
  name: 'BaseSubmitBlock',
  components: {
    BaseModal: () => import('./BaseModal'),
    BaseMessage: () => import('./BaseMessage'),
    BaseSubmitHelp: () => import('./BaseSubmitHelp'),
  },
  props: {
    isFormValid: {
      type: Boolean,
      required: true,
    },
    missedNames: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Object,
      required: true,
    },
  },
  computed: {
    submitDisabled() {
      return !this.isFormValid || this.isLoading;
    },
  },
  methods: {
    onClick() {
      this.$emit('submit');
    },
  },
};
</script>
