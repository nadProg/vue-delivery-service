<template>
  <BaseSubmitBlock
    :is-form-valid="isFormValid"
    :missed-names="missedNames"
    :is-loading="isLoading"
    :is-success="isSuccess"
    :is-error="isError"
    @submit="onSubmit"
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
  data: () => ({
    isError: false,
    isLoading: false,
    isSuccess: false,
  }),
  computed: {
    ...mapGetters('form', ['isFormValid', 'missedNames']),
  },
  methods: {
    ...mapActions(['sendData']),
    ...mapActions('form', ['reset']),
    onSubmit() {
      this.isLoading = true;
      this.isError = false;

      this.sendData()
        .then(() => {
          this.reset();
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
        })
        .catch((error) => {
          this.isError = true;
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
