import Vuex from 'vuex';
const fetchJson = async (method = 'get', url, body, token) => {
  url = `${process.env.IPHOST}${url}`;
  const fetchOpts = {
    method,
  };
  if (method == 'post') {
    fetchOpts.headers = { 'Content-Type': 'text/plain' };
    if (body) fetchOpts.body = JSON.stringify(body);
  }
  if (token) {
    fetchOpts.headers = { 'Authorization': `Bearer ${token}` };
  }
  const response = await fetch(url, fetchOpts);
  const json = await response.json();
  return json;
};
const createStore = () => new Vuex.Store({
  state: {
    auth: null,
  },
  mutations: {
    SET_USER(state, auth) {
      state.auth = auth;
    }
  },
  actions: {
    async login({ commit }, { password }) {
      try {
        const resp = await fetchJson('post', '/api/login', { password });
        console.log(resp);
        commit('SET_USER', { token: resp.data.token });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
    async logout({ commit }) {
      await fetchJson('post', '/api/logout');
      commit('SET_USER', null);
    }
  }
});
export default createStore;