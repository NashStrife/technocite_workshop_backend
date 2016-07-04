var Company = require('../api/crm/model');

var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var companies = {
    "name" : "Ma société",
    "pwd" : "pass123",
    "logo" : "logo.png",
    "tva" : {
        "num" : "BE 0214.563.254",
        "siren" : "",
        "rcs" : ""
    },
    "contact" : {
        "street" : "Ma Rue",
        "number" : 1,
        "box" : "",
        "zip" : "1000",
        "town" : "Ma Ville",
        "country" : "Belgique",
        "mail" : "mon.mail@gmail.com",
        "phoneMain" : "+32 45 256 365",
        "phoneSec" : "+32 24 569 874",
        "fax" : "071 25 96 78",
        "web" : "http://www.monsite.be"
    },
    "contactPerson" : {
        "civility" : "Monsieur",
        "firstname" : "John",
        "lastname" : "Doe",
        "function" : "Gérant",
        "mail" : "john.doe@gmail.com",
        "phoneMain" : "+32 493 452 365",
        "phoneSec" : ""
    },
    "customers" : [
        {
            "name" : "Sébastien Jacques",
            "isCompany" : false, 
            "tva" : {
                "num" : "",
                "siren" : "",
                "rcs" : ""
            },
            "billingInfo" : {
                "civility" : "Monsieur",
                "firstname" : "Sébastien",
                "lastname" : "Jacques",
                "street" : "Rue Albert Bodson",
                "number" : 38,
                "box" : "",
                "zip" : "6280",
                "town" : "Gerpinnes",
                "country" : "Belgique",
                "mail" : "jac.sebastien@gmail.com",
                "phoneMain" : "0493 17 24 69",
                "phoneSec" : "",
                "fax" : ""
            },
            "deliveryInfo" : {
                "civility" : "Monsieur",
                "firstname" : "Sébastien",
                "lastname" : "Jacques",
                "company" : "",
                "street" : "Rue Albert Bodson",
                "number" : 38,
                "box" : "",
                "zip" : "6280",
                "town" : "Gerpinnes",
                "country" : "Belgique",
            },
            "contactPerson" : {
                "civility" : "Monsieur",
                "firstname" : "Sébastien",
                "lastname" : "Jacques",
                "post" : "",
                "mail" : "jac.sebastien@gmail.com",
                "phoneMain" : "0493 17 24 69",
                "phoneSec" : "",
                "pwd" : "pass123"
            },
            "bills" : [
                {
                    "link" : "20160629-01001",
                    "state" : true,
                    "createdAt" : "2016-06-29",
                    "payedAt" : "2016-06-31"
                }
            ], 
            "quotations" : [
                {
                    "link" : "20160621-01001",
                    "state" : true,
                    "createdAt" : "2016-06-21"
                },{
                    "link" : "20160408-01001",
                    "state" : false,
                    "createdAt" : "2016-04-08"
                }
            ], 
            "memo" : "Le premier client",
            "createdAt" : Date.now(),
            "updatedAt" : ""
        },{
            "name" : "Blizzard",
            "isCompany" : true, 
            "tva" : {
                "num" : "BE 0851.968.717",
                "siren" : "",
                "rcs" : ""
            },
            "billingInfo" : {
                "civility" : "",
                "firstname" : "",
                "lastname" : "",
                "street" : "Beechavenue",
                "number" : 131,
                "box" : "D",
                "zip" : "1119 RB",
                "town" : "Schiphol-Rijk",
                "country" : "Pays-Bas",
                "mail" : "infos@blizzard.com",
                "phoneMain" : "+32 25 258 963",
                "phoneSec" : "",
                "fax" : ""
            },
            "deliveryInfo" : {
                "civility" : "",
                "firstname" : "",
                "lastname" : "",
                "company" : "",
                "street" : "Beechavenue",
                "number" : 131,
                "box" : "D",
                "zip" : "1119 RB",
                "town" : "Schiphol-Rijk",
                "country" : "Pays-Bas",
            },
            "contactPerson" : {
                "civility" : "Monsieur",
                "firstname" : "Bart",
                "lastname" : "Smith",
                "post" : "Management",
                "mail" : "bartsmith@blizzard.com",
                "phoneMain" : "+32 254 896 456",
                "phoneSec" : "",
                "pwd" : "pass123"
            },
            "bills" : [
                {
                    "link" : "20160425-01002",
                    "state" : true,
                    "createdAt" : "2016-04-25",
                    "payedAt" : "2016-04-31"
                },{
                    "link" : "20160512-01002",
                    "state" : false,
                    "createdAt" : "2016-05-12",
                    "payedAt" : ""
                }
            ], 
            "quotations" : [
                {
                    "link" : "20160415-01002",
                    "state" : true,
                    "createdAt" : "2016-04-15"
                },{
                    "link" : "20160502-01002",
                    "state" : true,
                    "createdAt" : "2016-05-02"
                }
            ], 
            "memo" : "Très gros client",
            "createdAt" : Date.now(),
            "updatedAt" : ""
        }
    ],
    "paymentInfo" : {
        "bank" : [
            {
                "name" : "Belfius Account",
                "iban" : "BE02589674859",
                "bic" : "AFR"
            },
            {
                "name" : "Fortis Account",
                "iban" : "BE250650879685",
                "bic" : "DCF"
            }
        ],
        "paypal" : [
            {
                "name" : "Paypal 01",
                "mail" : "mail@gmail.com"
            }
        ]
    },
    "templates" : {
        "bill" : 1,
        "quotation" : 1
    },
    "createdAt" : Date.now(),
    "updatedAt" : ""
};


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
    var cleanPromises = [Company]
        // list all resto corresponding to the model
        .map(function(model) {
            // and remove it
            return model.remove().exec();
        });
    // when all promises corresponding to "cleanPromises are done, the function is finished
    return Promise.all(cleanPromises);
};

// function to create new restos
var createCompanies = function(data) {
    // new promise
    var promises = companies.map(function(company) {
        // create thx to the function created before, merging the model [Resto] to the data [resto]
        return createDoc(Company, company);
    });

    // when all promises corresponding to "promises" are done
    return Promise.all(promises)
        // then do the next step
        .then(function(companies) {
            // return all data merged thx to lodash
            return _.merge({
                companies: companies
                // or if no data return a void object
            }, data || {});
        });
};

// each time we clean the db, then create new one with default data
cleanDB()
    .then(createCompanies)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger));