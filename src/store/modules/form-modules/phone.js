export const phone = {
  state: {
    type: 'text',
    name: 'phone',
    value: '',
    mask: {
      mask: '+{7} (000) 000 - 00 - 00',
      lazy: false,
    },
    isValid: false,
    header: 'Номер телефона',
    errorMessage: 'Введите номер телефона',
    accusativeName: 'номер телефона',
  },
};
