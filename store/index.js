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
    Promise.reject(e);
  }
};
const createStore = () => new Vuex.Store({
  state: {
    auth: null,
    code: '',
    configname: '',
    confname: '',
    action: ''
  },
  mutations: {
    SET_USER(state, auth) {
      state.auth = auth;
    },
    CHANGE_ACTION(state, action){
      state.action = action;
    },
    CLEAR_USER(state){
      state.auth = null;
      state.code = '';
      state.configname = '';
      state.confname = '';
    },
    CHANGE_CODE(state, code){
      state.code = code;
    },
    CHANGE_CONFNAME(state, confname){
      state.confname = confname;
    },
    NAME_CONFIGNAME(state, configname){
      state.configname = configname;
    },
    CLEAR_EDITOR(state){
      state.code = '';
      state.confname = '';
      state.configname = '';
    }
  },
  actions: {
    async login({ commit }, { password }) {
      try {
        const resp = await fetchJson('post', '/api/login', { password });
        commit('SET_USER', { token: resp.data.token });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials');
        }
        throw error;
      }
    },
    logout({ commit }) {
      commit('CLEAR_USER');
    },
    neweditor({ commit }) {
      commit('CLEAR_EDITOR');
      commit('CHANGE_ACTION', 'new');
    },
    async token({ state }){
      const token = state.auth.token || '';
      await fetchJson('get', '/api/token', {}, token );
    },
    async getvhosts({ state }){
      const token = state.auth.token || '';
      const resp = await fetchJson('get', '/api/sites', {}, token);
      return resp.data;
    },
    async getsite({ commit, state }, name){
      const token = state.auth.token || '';
      const response = await fetchJson('post', '/api/view', { name }, token);
      const v = response.data.name;
      commit('CHANGE_CODE', response.data.config);
      commit('CHANGE_ACTION', 'edit');
      commit('NAME_CONFIGNAME', v);
      commit('CHANGE_CONFNAME', v);
      return v;
    },
    async saveconfig({ state }){
      const token = state.auth.token || '';
      await fetchJson('post', '/api/new', { name: state.confname, config: state.code }, token);
    },
    async deleteconfig({ state }){
      const token = state.auth.token || '';
      await fetchJson('post', '/api/del', { name: state.confname }, token);
    },
    async editconfig({ state }){
      const token = state.auth.token || '';
      await fetchJson('post', '/api/edit', { name: state.confname, config: state.code }, token);
    },
    async nginxrestart({ state }){
      const token = state.auth.token || '';
      await fetchJson('post', '/api/restart', {}, token);
    }
  }

});
export default createStore;