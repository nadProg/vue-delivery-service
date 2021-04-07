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
    <div class="form__submit-state">
      <p
        v-if="isLoading"
        class="message message--loading"
      >
        Идет отправка...
      </p>
      <p
        v-else-if="isError"
        class="message message--error"
      >
        Произошла ошибка =(<br>Попробуйте еще раз
      </p>
      <p
        v-else-if="isSuccess"
        class="message message--success"
      >
        Заказ успешно сформирован!
      </p>
      <template v-else-if="!isFormValid">
        <div aria-live="polite">
          <p class="form__submit-header">
            Осталось заполнить:
          </p>
          <p
            class="form__submit-help"
            v-html="submlitHelpContent"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseSubmitBlock',
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
    isError: {
      type: Boolean,
      default: false,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    submitDisabled() {
      return !this.isFormValid || this.isLoading;
    },
    submlitHelpContent() {
      let lastName;
      const missedNames = this.missedNames.map(
        (name) => `<span>${name}</span>`,
      );

      if (missedNames.length > 1) lastName = missedNames.pop();

      let content = missedNames.join(', ');

      if (lastName) {
        content += ` и ${lastName}`;
      }

      return content;
    },
  },
  methods: {
    onClick() {
      this.$emit('submit');
    },
  },
};
</script>
<style></style>
