import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      isAuthenticated: false,
      role: ''
    }
  },
  mutations: {
    setUser(state, user) {
      state.user.isAuthenticated = true;
      state.user.role = user.role;
    },
    logout(state) {
      state.user.isAuthenticated = false;
      state.user.role = '';
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => state.user.isAuthenticated,
    userRole: state => state.user.role,
  }
});
