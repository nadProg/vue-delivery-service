export const filter = {
  namespaced: true,
  state: {
    'delivery-method': {
      type: 'tabs',
      name: 'delivery-method',
      value: 'pickup',
      inputs: [
        {
          value: 'pickup',
          label: 'Самовывоз',
        },
        {
          value: 'courier',
          label: 'Доставка курьером',
        },
      ],
      header: 'Выберите способ доставки',
    },
  },
  getters: {
    element: (state) => (name) => state[name],
  },
  actions: {
    updateValue({ commit }, payload) {
      commit('setValue', payload);
    },
  },
  mutations: {
    setValue(state, { value, name }) {
      state[name].value = value;
    },
  },
};
