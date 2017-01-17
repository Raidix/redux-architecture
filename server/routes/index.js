const express = require('express');

const api = express();

const raids = [
  {
    id: 'r1',
    name: 'raid1',
    size: 123,
    drives: [0, 1, 2],
  },
  {
    id: 'r2',
    name: 'raid2',
    size: 222,
    drives: [3, 4],
  },
  {
    id: 'r3',
    name: 'raid3',
    size: 333,
    drives: [5, 6],
  },
];

api.get('/raid', (req, res) => {
  res.send({
    status: 'OK',
    result: raids,
    warnings: [],
  });
});

module.exports = api;
