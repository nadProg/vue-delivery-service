import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { form } from './modules/form';
import { filter } from './modules/filter';

const BASE_URL = 'https://fake-json-shop-heroku.herokuapp.com';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    form,
    filter,
  },
  state: {
    data: null,
    pickupPointMap: {},
  },
  getters: {
    element: (state, getters) => (module, name) => {
      return getters[`${module}/element`](name);
    },
    coords: (state) => {
      return state.pickupPointMap[state.form['pickup-point'].value];
    },
  },
  actions: {
    async getData({ state, commit, dispatch }) {
      const URL = `${BASE_URL}/db`;
      const { data } = await axios.get(URL);

      dispatch('adoptResponse', data);

      commit('form/setInputs', {
        name: 'city',
        inputs: state.data.cityList,
      });

      commit('form/setBoundInputs', {
        name: 'city',
        boundInputs: [
          {
            name: 'pickup-point',
            inputMap: state.data.pickpointMap,
          },
        ],
      });

      dispatch('form/reset');
    },
    async sendData({ getters }) {
      const URL = `${BASE_URL}/requests`;
      const body = JSON.stringify(getters['form/data']);
      const headers = {'content-type': 'application/json;charset=utf-8'};

      return axios.post(URL, body, { headers });
    },
    adoptResponse({ commit }, { cities }) {
      const data = {
        cityList: [],
        pickpointMap: {},
      };
      const coordsMap = {};

      cities.forEach((city) => {
        data.cityList.push({
          value: city.id,
          label: city.city,
        });

        data.pickpointMap[city.id] = [];

        city['delivery-points'].forEach((point, index) => {
          data.pickpointMap[city.id].push({
            value: `${city.id}-${index + 1}`,
            label: point.address,
          });

          coordsMap[data.pickpointMap[city.id][index].value] =
            point.coordinates;
        });
      });

      commit('setData', data);
      commit('setPickupPointMap', coordsMap);
    },
    updateValue({ dispatch }, { module, value, name }) {
      dispatch(`${module}/updateValue`, { name, value });
    },
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setPickupPointMap(state, map) {
      state.pickupPointMap = map;
    },
  },
});
