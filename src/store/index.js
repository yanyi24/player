import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSource: {},
    currentSourceIndex: null,
    sourceList: [],
    playRate: 1,
    loop: true
  },
  mutations: {
    changeSource(state, source) {
      const date = Math.floor(source.date);
      const duration = Math.floor(source.duration);
      if (date === duration) {
        source.date = 0;
      }
      state.currentSource = source;
    },
    changeSourceIndex(state, index) {
      state.currentSourceIndex = index;
    },
    changePlayRate(state, rate) {
      state.playRate = rate;
    },
    setPlayedDate(state, date) {
      state.currentSource.date = date;
      state.sourceList[state.currentSourceIndex] = state.currentSource;
      localStorage.setItem('sourceList', JSON.stringify(state.sourceList));
    },
    setSourceList(state, data) {
      state.sourceList = data;
    },
    addSource(state, data) {
      state.sourceList.push(data);
      localStorage.setItem('sourceList', JSON.stringify(state.sourceList));
    },
    clearListAll(state) {
      state.sourceList = [];
      state.currentSourceIndex = null;
      state.currentSource = {};
      localStorage.clear('sourceList');
    },
    switchLoop(state, isLoop) {
      state.loop = isLoop;
    },
    switchNextSource(state){
      if (state.currentSourceIndex < state.sourceList.length - 1) {
        const nextSource = state.sourceList[state.currentSourceIndex + 1];
        this.commit('changeSource', nextSource);
        state.currentSourceIndex += 1;
      }
    }
  },
  actions: {
  },
  getters: {
    currentSource(state) {
      return state.currentSource;
    },
    list(state) {
      return state.sourceList;
    },
    currentIndex(state) {
      return state.currentSourceIndex;
    },
    getRate(state) {
      return state.playRate;
    },
    loop(state) {
      return state.loop;
    }
  }
})
