<template>
  <div class="submit-help">
    <p>Осталось заполнить:</p>
    <p v-html="content" />
  </div>
</template>
<script>
export default {
  name: 'BaseSubmitHelp',
  props: {
    missedItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    content() {
      let lastItem;
      const missedItems = this.missedItems.map(
        (name) => `<b>${name}</b>`,
      );

      if (missedItems.length > 1) lastItem = missedItems.pop();

      let content = missedItems.join(', ');

      if (lastItem) {
        content += ` и ${lastItem}`;
      }

      return content;
    },
  },
};
</script>
<style>
.submit-help b {
  color: var(--color-text-red);
}
</style>
