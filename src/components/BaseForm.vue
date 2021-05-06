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
      <BaseMessage
        v-if="message.status"
        :status="message.status"
      >
        {{ message.text }}
      </BaseMessage>
      <template v-else>
        <slot name="elements" />
        <span class="form__info">{{ content.formInfo }}</span>
        <slot name="submit" />
      </template>
    </form>
  </section>
</template>
<script>
import BaseMessage from './BaseMessage.vue';

export default {
  name: 'BaseForm',
  components: {
    BaseMessage,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>
