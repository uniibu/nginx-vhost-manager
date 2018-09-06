const envalid = require('envalid');
const { str, bool, port } = envalid;
const crypto = require('crypto');
module.exports = envalid.cleanEnv(process.env, {
  PORT: port({ default: 8080 }),
  TRUST_PROXY: bool({ default: false }),
  NODE_ENV: str({ default: 'development' }),
  PREFIX: str({ default: '' }),
  SECRET: str({ default: crypto.randomBytes(8).toString('hex') }),
  PASSWORD: str({ default: 'password' })
});