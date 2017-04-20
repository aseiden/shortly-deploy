var path = require('path');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
  // useNullAsDefault: true
// });
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data/db/test');

var db = mongoose.connection;

db.once('open', function() {
  console.log('I AM CONNECTED TO THE MONGODB');

  var kittySchema = mongoose.Schema({
    name: String
  });

  var Kitten = mongoose.model('Kitten', kittySchema);

  var silence = new Kitten({ name: 'Silence' });
  console.log('WHAT IS THE SOUND OF SILENCE!!??!?!?', silence.name); // 'Silence'

  var Kitten = mongoose.model('Kitten', kittySchema);

  var fluffy = new Kitten({ name: 'fluffy' });

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log(fluffy, 'IT"S SO FLUFFY');
  });

});

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = db;
