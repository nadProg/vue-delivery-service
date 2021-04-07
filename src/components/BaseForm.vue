<template>
  <section class="form">
    <h2 class="visually-hidden">
      {{ content.sectionTitle }}
    </h2>
    <form
      action="#"
      method="POST"
    >
      <h3>{{ content.formTitle }}</h3>
      <p
        v-if="isLoading"
        class="message message--loading"
        role="alert"
      >
        Подождите идет загрузка...
      </p>
      <p
        v-else-if="isError"
        class="message message--error"
        role="alert"
      >
        Что-то пошло не так, попробуйте позже...
      </p>
      <template v-else>
        <slot name="elements" />
        <span class="form__info">{{ content.formInfo }}</span>
        <slot name="submit" />
      </template>
    </form>
  </section>
</template>
<script>
export default {
  name: 'BaseForm',
  props: {
    content: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      deafault: true,
    },
  },
};
</script>
