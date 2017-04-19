/* globals process */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./root.prod.jsx');  // eslint-disable-line global-require
} else {
  module.exports = require('./root.dev.jsx');   // eslint-disable-line global-require
}
