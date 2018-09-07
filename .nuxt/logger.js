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
  
  
  logger['log'] = () => {}
  
  
  
  logger['info'] = () => {}
  
  
  
  logger['warn'] = () => {}
  
  
  
  logger['error'] = () => {}
  
  

  ctx.$logger = logger;
  inject('logger', logger);
};