const path = require('path');
const express = require('express');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();

// hot mode middlewares
if (process.env.NODE_ENV === 'hot') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  console.log('It\'s hot!');  // eslint-disable-line no-console
  // HMR
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  /* eslint-enable */
}

// dev server provide static files
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'hot') {
  app.use('/public', express.static(path.join(__dirname, '../public')));
}

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console

    return;
  }

  console.log(`Listening at http://localhost:${port}`); // eslint-disable-line no-console
});
