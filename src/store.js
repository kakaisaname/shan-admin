import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  adminInfo: {
    avatar: "son.jpg"
  },
}

export default new Vuex.Store({
  state,
  mutations: {},
  actions: {}
});
