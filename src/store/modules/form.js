import { card } from './form-modules/card';
import { city } from './form-modules/city';
import { date } from './form-modules/date';
import { time } from './form-modules/time';
import { phone } from './form-modules/phone';
import { address } from './form-modules/address';
import { pickupPoint } from './form-modules/pickupPoint';
import { paymentMethod } from './form-modules/paymentMethod';

import checkValidity from '@/utils/checkValidity';

export const form = {
  namespaced: true,
  modules: {
    card,
    city,
    date,
    time,
    phone,
    address,
    'pickup-point': pickupPoint,
    'payment-method': paymentMethod,
  },
  state: {
    orderList: [
      'city',
      'pickup-point',
      'address',
      'date',
      'time',
      'payment-method',
      'card',
      'phone',
    ],
  },
  getters: {
    element: (state) => (name) => {
      return state[name];
    },
    isShowElement: (state, getters, rootState) => (name) => {
      switch (name) {
        case 'pickup-point':
          return rootState.filter['delivery-method'].value === 'pickup';
        case 'address':
        case 'date':
        case 'time':
          return rootState.filter['delivery-method'].value === 'courier';
        case 'card':
          return state['payment-method'].value === 'card';
        default:
          return true;
      }
    },
    elementsToShow: (state, getters) => {
      return state.orderList.filter((name) => getters.isShowElement(name));
    },
    validatedElements: (state) => {
      return state.orderList.filter((name) =>
        Object.prototype.hasOwnProperty.call(state[name], 'isValid'),
      );
    },
    isElementValidated: (state, getters) => (name) => {
      return getters.validatedElements.includes(name);
    },
    invalidNames: (state, getters) => {
      return getters.validatedElements.filter(
        (name) => getters.isShowElement(name) && !state[name].isValid,
      );
    },
    isFormValid: (state, getters) => {
      return !getters.invalidNames.length;
    },
    missedNames: (state, getters) => {
      return getters.invalidNames.map((name) => state[name].accusativeName);
    },
    data: (state, getters) => {
      const formNames = state.orderList.filter((name) =>
        getters.isShowElement(name),
      );
      const data = {};
      formNames.forEach((name) => (data[name] = state[name].value));

      return data;
    },
  },
  actions: {
    updateValue({ state, commit, getters }, { value, name }) {
      commit('setValue', { value, name });

      if (getters.isElementValidated(name)) {
        commit('setValidity', { name, isValid: checkValidity(value, name) });
      }

      if (state[name].boundInputs) {
        state[name].boundInputs.forEach((boundInput) => {
          commit('setInputs', {
            name: boundInput.name,
            inputs: boundInput.inputMap[value],
          });
          commit('setValue', {
            name: boundInput.name,
            value: boundInput.inputMap[value][0].value,
          });
        });
      }
    },
    reset({ state, dispatch }) {
      state.orderList.forEach((name) => {
        switch (state[name].type) {
          case 'tabs':
            dispatch('updateValue', {
              name,
              value: state[name].inputs[0].value,
            });
            break;
          case 'slider':
            dispatch('updateValue', { name, value: state[name].min });
            break;
          default:
            dispatch('updateValue', { name, value: '' });
            break;
        }
      });
    },
  },
  mutations: {
    setValue(state, { name, value }) {
      state[name].value = value;
    },
    setValidity(state, { name, isValid }) {
      state[name].isValid = isValid;
    },
    setInputs(state, { name, inputs }) {
      state[name].inputs = inputs;
    },
    setBoundInputs(state, { name, boundInputs }) {
      state[name].boundInputs = boundInputs;
    },
  },
};
