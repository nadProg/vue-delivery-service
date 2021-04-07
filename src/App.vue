<template>
  <BaseApp>
    <template #sprite>
      <TheSprite />
    </template>
    <template #header>
      {{ headerText }}
    </template>
    <template #filter>
      <WrapperInput
        key="delivery-method"
        module="filter"
        name="delivery-method"
      />
    </template>
    <template #form>
      <TheForm />
    </template>
  </BaseApp>
</template>
<script>
import BaseApp from './components/BaseApp.vue';
import TheForm from './components/TheForm.vue';
import TheSprite from './components/TheSprite.vue';
import WrapperInput from './components/WrapperInput.vue';

export default {
  name: 'App',
  components: {
    BaseApp,
    TheForm,
    TheSprite,
    WrapperInput,
  },
  data: () => ({
    headerText: 'Заказ доставки в интернет-магазине',
  }),
};
</script>
