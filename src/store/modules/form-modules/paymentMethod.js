export const paymentMethod = {
  state: {
    type: 'tabs',
    name: 'payment-method',
    value: 'card',
    inputs: [
      {
        value: 'card',
        label: 'Карта',
      },
      {
        value: 'cash',
        label: 'Наличные',
      },
    ],
    sectionHeader: 'Способ оплаты',
  },
};
