import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess', user);
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    updateUser({ commit }, user) {
      return AuthService.updateUser(user).then(
        response => {
          commit('updateUserProfileSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('updateUserProfileFailure');
          return Promise.reject(error);
        }
      );
    },

    resetPassword({ commit }, user) {
      return AuthService.resetPassword(user).then(
        response => {
          commit('resetPasswordSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('resetPasswordFailure');
          return Promise.reject(error);
        }
      );
    },

    forgotPassword({ commit }, user) {
      return AuthService.forgotPassword(user).then(
        response => {
          commit('forgotPasswordSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('forgotPasswordFailure');
          return Promise.reject(error);
        }
      );
    },
    
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    updateUserProfileSuccess(state) {
      state.status.loggedIn = true;
    },
    updateUserProfileFailure(state) {
      state.status.loggedIn = true;
    },
    resetPasswordSuccess(state) {
      state.status.loggedIn = true;
    },
    resetPasswordFailure(state) {
      state.status.loggedIn = true;
    }
  }
};
