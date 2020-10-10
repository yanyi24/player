import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSource: {},
    playRate: 1
  },
  mutations: {
    changeSource(state, source) {
      state.currentSource = source;
    },
    changePlayRate(state, rate) {
      state.playRate = rate;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getSource(state) {
      return state.currentSource;
    },
    getRate(state) {
      return state.playRate;
    }
  }
})
