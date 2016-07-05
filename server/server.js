let express = require('express');
let bodyParser = require('body-parser');
let api = require('./api/api');
let logger = require(`${process.cwd()}/server/utils/logger`);
// get the db module
let db = require(`${process.cwd()}/server/utils/db`);
// use the config module to check if we are in dev mode or not
let config = require(`${process.cwd()}/server/config/config`);
let app = express();
// launch the connection to the db thanks to utils/db.js once for all the app
db.config();
// if "seed" is set to "true" in the config module
if (config.seed) {
    logger.log("config seed");
    // use the seed module to add some data to the db
    require('./utils/seed');
}

// if we use a static route
app.use(express.static('public'));
app.use(bodyParser());
app.use(bodyParser.json());

app.use('/api', api);

// we go to the / url and not /api/...
app.use('/', function(req, res){
    res.status(200);	// avec express plus besoin d'envoyer des statuts il le fait tt seul
  	res.sendFile(`${process.cwd()}/public/index.html`);
});

app.use(function(err,req,res,next){
   logger.warn(err.message);
   res.status(500).send('Oops server is in a bad mood !'); 
});

module.exports = app;