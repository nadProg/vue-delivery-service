<template>
  <BaseSubmitBlock
    :is-form-valid="isFormValid"
    :missed-names="missedNames"
    :is-loading="isLoading"
    :modal="modalProps"
    @submit="onSubmit"
    @close-modal="showModal=false"
  />
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

import BaseSubmitBlock from './BaseSubmitBlock';

export default {
  name: 'SubmitBlock',
  components: {
    BaseSubmitBlock,
  },
  data() {
    return ({
      isError: false,
      isLoading: false,
      isSuccess: false,
      showModal: false,
      orderId: 0,
    });
  },
  computed: {
    ...mapGetters('form', ['isFormValid', 'missedNames']),
    modalStatus() {
      if (this.isError) return 'error';
      if (this.isSuccess) return 'success';
      return '';
    },
    modalText() {
      switch (this.modalStatus) {
        case 'success':
          return `Ваш заказ успешно сформирован! Номер заказа - ${this.orderId}`;
        case 'error':
          return 'Произошла ошибка отправки, пожалуйста повторите попытку позже...';
        default:
          return '';
      }
    },
    modalProps() {
      return ({
        show: this.showModal,
        status: this.modalStatus,
        text: this.modalText,
      });
    },
  },
  methods: {
    ...mapActions(['sendData']),
    ...mapActions('form', ['reset']),
    onSubmit() {
      this.isLoading = true;
      this.isSuccess = false;
      this.isError = false;

      this.sendData()
        .then(({ data: { id } }) => {
          this.orderId = id;
          this.reset();
          this.isSuccess = true;
        })
        .catch(() => {
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
          this.showModal = true;
        });
    },
  },
};
</script>
