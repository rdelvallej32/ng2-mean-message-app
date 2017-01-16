'use strict';
/*eslint no-process-env:0*/

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import appRoutes from './routes';
import mainRoute from './routes/app';

const uri = process.env.MONGODB_URI || 'mongodb://localhost/ng-messenger'
const app = express();
mongoose.connect(uri);
mongoose.connection.on('error', err => {
  console.error(`MongoDb connection error ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(`${__dirname}`, '/../public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api', appRoutes);
app.use('/', mainRoute);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    return res.render('index');
});


exports = module.exports = app;
