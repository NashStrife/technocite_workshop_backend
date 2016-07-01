var Resto = require('../api/restos/model');

var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

// we don't define the updatedAt Date cause it is automatically updated thx to Date.now in the model
var restos = [{
    name: 'jade de chine',
    address: {
        street: "Rue d'Havré",
        number: 23,
        zip: 7000,
        town: "Mons",
        country: "Belgium"
    },
    cookTyme: ["asiatique", "Vientanienne"],
    comments: ["excellent", "superbe ambiance"],
    pictures: [{
        title: 'Nouvel an chinois',
        link: 'jade2016.jpg'
    }, {
        title: 'Nouvel an chinois',
        link: 'jade2015.jpg'
    }],
    url: 'http://www.jadechine.be',
    createdAt: Date.now()
}, {
    name: 'La bergerie',
    address: {
        street: "Rue des canadiens",
        number: 239,
        zip: 7020,
        town: "Hyon",
        country: "Belgium"
    },
    cookTyme: ["grecque", "farnçaise"],
    comments: ["pas bon", "moyen qualité"],
    pictures: [{
        title: 'Nouvel',
        link: 'bergerie2016.jpg'
    }, {
        title: 'Mes 40 ans',
        link: 'bergerie2015.jpg'
    }],
    url: 'http://www.jadechine.be',
    createdAt: Date.now()
}];


// add elements to the db merging the model with data created before
var createDoc = function(model, doc) {
    // use the promise to manage what we do after
    return new Promise(function(resolve, reject) {
        // prepare data in function of the model and save it into the db
        new model(doc).save(function(err, saved) {
            // if errors send it and stop the process thanx to the reject from the promise
            // else save the doc
            return err ? reject(err) : resolve(saved);
        });
    });
};

// creation of a clean method to clean the db each time we launch the application to avoid having too many data inside the db
var cleanDB = function() {
    logger.log('... cleaning the DB');
    // clean thx to the model imported at the begining of the file
    var cleanPromises = [Resto]
        // list all resto corresponding to the model
        .map(function(model) {
            // and remove it
            return model.remove().exec();
        });
    // when all promises corresponding to "cleanPromises are done, the function is finished
    return Promise.all(cleanPromises);
};

// function to create new restos
var createRestos = function(data) {
    // new promise
    var promises = restos.map(function(resto) {
        // create thx to the function created before, merging the model [Resto] to the data [resto]
        return createDoc(Resto, resto);
    });

    // when all promises corresponding to "promises" are done
    return Promise.all(promises)
        // then do the next step
        .then(function(restos) {
            // return all data merged thx to lodash
            return _.merge({
                restos: restos
                // or if no data return a void object
            }, data || {});
        });
};

// each time we clean the db, then create new one with default data
cleanDB()
    .then(createRestos)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger));