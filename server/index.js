const path = require('path');
const express = require('express');
// const webpack = require('webpack');
// const config = require('./webpack.config.dev');
// const compiler = webpack(config);

const port = process.env.PORT || 3000;

const app = express();

// if (process.env.NODE_ENV === 'development') {
//   app.use(require('webpack-dev-middleware')(compiler, {
//     publicPath: config.output.publicPath,
//     stats: {
//       colors: true,
//     },
//   }));
//
//   app.use(require('webpack-hot-middleware')(compiler));
//
//   app.get('*', (req, res, next) => {
//     const filename = path.join(compiler.outputPath, 'index.html');
//
//     compiler.outputFileSystem.readFile(filename, (err, result) => { // eslint-disable-line consistent-return
//       if (err) {
//         return next(err);
//       }
//       res.set('content-type', 'text/html');
//       res.send(result);
//     });
//   });
// }

if (process.env.NODE_ENV === 'development') {
  // public files
  app.use('/public', express.static(path.join(__dirname, '../public')));
}

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

