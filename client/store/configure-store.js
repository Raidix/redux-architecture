/* global process */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configure-store.prod.js');  // eslint-disable-line global-require
} else {
  module.exports = require('./configure-store.dev.js');   // eslint-disable-line global-require
}
