const express = require('express');

const api = express();

let raids = [
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
  setTimeout(() => {
    res.status(200).send({
      status: 'OK',
      result: raids,
      warnings: [],
    });
  }, 1000);
});

api.delete('/raid/:id', (req, res) => {
  const id = req.params.id;

  raids = raids.filter(raid => raid.id !== id);

  setTimeout(() => {
    res.status(200).send({
      status: 'OK',
      warnings: [],
    });
  }, 300);
});

const drives = [];

for (let i = 0; i < 7; i += 1) {
  drives.push({ id: i, name: `drive_${i}` });
}

api.get('/drive', (req, res) => {
  setTimeout(() => {
    res.status(200).send({
      status: 'OK',
      result: drives,
      warnings: [],
    });
  }, 500);
});

module.exports = api;
