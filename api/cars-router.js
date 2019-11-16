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

// All Cars
router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

// One car
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('cars').where({ id }).first()
    .then(car => {
      res.json(car);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve car' });
    });
  });
  
  // Add a car
  router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
    .then(ids => {
      db('cars').where({ id: ids[0] })
      .then(newCarEntry => {
        res.status(201).json(newCarEntry);
      });
    })
    .catch (err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
  });

  // Delete a Car 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const count = await db.del().from('cars').where({ id });
      count ? res.status(200).json({ deleted: count })
          : res.status(404).json({ message: 'car not found' });
  } catch (err) {
      res.status(500).json({ message: 'Error', error: err });
  }


});
  
// Update a car
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('cars').where({ id }).update(changes)
      .then(count => {
          if (count) {
              res.status(200).json({ updated: count });
          } else {
              res.status(404).json({ message: 'car not found' });
          }
      })
      .catch(err => {
          res.status(500).json({ message: 'Error' });
      });


});

module.exports = router;