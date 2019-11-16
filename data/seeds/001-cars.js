exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, vin: '123456789',make: 'Honda',model: 'Civic', mileage: 50000 ,transmission_type: 'Manual',title_status: 'clean'},
        {id: 2, vin: '123456788',make: 'Honda',model: 'Accord', mileage: 75000 ,transmission_type: 'Automatic',title_status: 'clean'},
        {id: 3, vin: '123456787',make: 'Toyota',model: 'Corolla', mileage: 150000 ,transmission_type: 'Manual',title_status: 'clean'},
        {id: 4, vin: '123456786',make: 'Chevy',model: 'Malibu', mileage: 52000 ,transmission_type: 'Automatic',title_status: 'clean'}
      ]);
    });
};