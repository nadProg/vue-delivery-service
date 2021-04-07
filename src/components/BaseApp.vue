<template>
  <div>
    <div
      class="visually-hidden"
      role="presentation"
    >
      <slot name="sprite" />
    </div>
    <div class="page-header" />
    <div class="wrapper">
      <main class="page-main">
        <h1 class="visually-hidden">
          <slot name="header" />
        </h1>
        <slot name="filter" />
        <slot name="form" />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseApp',
};
</script>
