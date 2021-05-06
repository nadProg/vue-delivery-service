<template>
  <BaseForm
    :message="messageProps"
    :content="content[filter]"
  >
    <template #elements>
      <template v-for="name of elementNames">
        <WrapperInput
          :key="name"
          module="form"
          :name="name"
        />
        <TheMap
          v-if="showMap(name)"
          :key="mapKey(name)"
        />
      </template>
    </template>
    <template #submit>
      <SubmitBlock />
    </template>
  </BaseForm>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import BaseForm from './BaseForm.vue';

export default {
  name: 'TheForm',
  components: {
    BaseForm,
    TheMap: () => import('./TheMap.vue'),
    SubmitBlock: () => import('./SubmitBlock.vue'),
    WrapperInput: () => import('./WrapperInput.vue'),
  },
  data: () => ({
    content: {
      pickup: {
        sectionTitle: 'Форма самовывоза',
        formTitle: 'Cамовывоз',
        formInfo:
          'Товар на складе будет привязан к номеру телефона. В пункте выдачи назовите номер телефона, чтобы получить ваш заказ.',
      },
      courier: {
        sectionTitle: 'Форма доставки курьером',
        formTitle: 'Доставка курьером',
        formInfo:
          'Курьер позвонит на указанный номер за час до доставки заказа.',
      },
    },
    message: {
      loading: 'Подождите идет загрузка...',
      error: 'Что-то пошло не так, попробуйте позже...',
    },
    isLoading: true,
    isError: false,
  }),
  computed: {
    ...mapState({
      filter: (state) => state.filter['delivery-method'].value,
    }),
    ...mapGetters('form', {
      elementNames: 'elementsToShow',
    }),
    messageStatus() {
      if (this.isLoading) return 'loading';
      if (this.isError) return 'error';
      return '';
    },
    messageProps() {
      return ({
        status: this.messageStatus,
        text: this.message[this.messageStatus],
      });
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.isError = false;

    this.getData()
      .catch(() => {
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions(['getData']),
    showMap(name) {
      return name === 'pickup-point';
    },
    mapKey(name) {
      return `${name}-map`;
    },
  },
};
</script>
