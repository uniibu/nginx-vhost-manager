const colors = {
  info: 'color:#2aa198; font-weight:bold',
  log: 'color:#859900; font-weight:bold',
  warn: 'color:#b58900; font-weight:bold',
  error: 'color:#dc322f; font-weight:bold',
  msg: 'color:#e08a09'
};
const parseMsg = msg => msg.map((m) => typeof m === 'object' ? JSON.stringify(m) : m);

export default (ctx, inject) => {
  const loggerInstance = {};
  loggerInstance.scope = 'SCOPE';
  const logger = Object.create(loggerInstance)
  <% for(var lvl of options.levels) { %>
  <% if (options.enabled) { %>
  logger['<%= lvl %>'] = function (...msg) {
    msg = parseMsg(msg);
    console['<%= lvl %>']('%c[<%= lvl.toUpperCase() %>][' + this.scope.toUpperCase() + '] %c' + msg.join(' ')
      <% if (options.colors) { %>, colors['<%= lvl %>'], colors.msg <% } %>)
  }
  <% } else { %>
  logger['<%= lvl %>'] = () => {}
  <% } %>
  <% } %>

  ctx.$logger = logger;
  inject('logger', logger);
};