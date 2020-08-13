require('dotenv').config();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const MongoClient = require('mongodb').MongoClient;

const MONGO_USR = process.env.MONGO_USR;
const MONGO_PASS = process.env.MONGO_PASS;

const uri = "mongodb+srv://deliveries:${MONGO_PASS}@cluster0.evvnh.mongodb.net/deliveries?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('conectado a mongo');
  client.close();
});

const app = express();


// mongoose.Promise = Promise;
// mongoose
  // .connect('mongodb://' + MONGO_USR + ':' + MONGO_PASS + '@ds161062.mlab.com:61062/deliveries', {useMongoClient: true})    
  // .then(() => {
  //   console.log('Conectado a Mongo!')
  // }).catch(err => {
  //   console.error('Error conectando a mongo', err)
  // });

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));

// PRODUCTION
app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'faviconBack.ico')));

const walmart = require('./routes/walmart');
app.use('/apiwalmart', walmart);

const pedido = require('./routes/pedido');
app.use('/apipedido', pedido);

const mapa = require('./routes/mapa');
app.use('/apimapa', mapa);

module.exports = app;
