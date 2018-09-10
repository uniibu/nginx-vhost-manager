import Vuex from 'vuex';
const fetchJson = async (method = 'get', url, body, token) => {
  try{
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
    const statuscode = response.status;
    const json = await response.json();
    if(statuscode !== 200 || json.success == false){
      return Promise.reject(json.error);
    }
    return json;
  }catch(e){
    console.log(e);
    Promise.reject(e);
  }
};
const createStore = () => new Vuex.Store({
  state: {
    auth: null,
  },
  mutations: {
    SET_USER(state, auth) {
      state.auth = auth;
    },
    CLEAR_USER(state){
      state.auth = null;
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
      commit('CLEAR_USER');
    },
    async token({ state }){
      const token = state.auth.token || '';
      await fetchJson('get', '/api/token', {}, token );
    }
  }
});
export default createStore;