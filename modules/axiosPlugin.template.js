import Axios from 'axios';
import { stringify } from 'querystring';
class NuxtAxios {
  constructor(...args) {
    this.axios = Axios.create(...args);
  }
  setHeaders(name, value, scopes = 'common') {
    scopes = !Array.isArray(scopes) ? scopes.split(',') : scopes
    for (let scope of scopes) {
      if (!value) {
        delete this.axios.defaults.headers[scope][name];
      } else {
        this.axios.defaults.headers[scope][name] = value
      }
    }
  }
  onRequest(fn) {
    this.axios.interceptors.request.use(config => fn(config) || config)
  }
  onResponse(fn) {
    this.axios.interceptors.response.use(response => fn(response) || response)
  }
  onRequestError(fn) {
    this.axios.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
  }
  onResponseError(fn) {
    this.axios.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
  }
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  }
  post(url, data) {
    return this.axios.post.apply(this, [url, stringify(data)]).then(res => res && res.data)
  }
  postJson(url, data) {
    return this.axios.post.apply(this, [url, data]).then(res => res && res.data)
  }
}
for (const method of ['request', 'delete', 'get', 'head', 'options', 'put', 'patch']) {
  NuxtAxios.prototype[method] = function () { return this.axios[method].apply(this, arguments).then(res => res && res.data) }
}
export default (ctx, inject) => {
  const axiosOpts = { baseURL: '<%= options.baseURL %>' };

  let axios = new NuxtAxios(axiosOpts);
  <% if (options.headers) { %>
  <% for(var k of options.headers) { %>
  axios.setHeaders('<%= k.name %>', '<%= k.value %>', '<%= k.scope %>')
  <% } %>
  <% } %>

  ctx.$axios = axios;
  inject('axios', axios);
};