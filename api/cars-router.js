const express = require('express');
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/car-dealer.db'
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(fruits => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

module.exports = router;