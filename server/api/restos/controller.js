let logger = require(`${process.cwd()}/server/utils/logger`);
// get an instance of the model of our db
let model = require('./model');

exports.get = function(req, res, next) {
    logger.log("controller get")
    // find() function of the model thanks to Mongoose [cf : http://mongoosejs.com/docs/queries.html]
    model.find()
    // once the query is done, do the following action thanks to a "promise"
    .then(function(docs){
        res.json(docs);
    });
};


exports.post = function(req, res, next) {
    logger.log("controller post");
    
    // we create a new model with the data to add to the db
    let resto = new model(req.body);
    
    // and add it to the db
    resto.save(function(err, data) {
        let message = {
            message: 'Document saved'
        };
        if (err) {
            message.message = err.message;
        }
        res.json(message);
    });
};


exports.update = function(req, res, next) {
    logger.log("controller Update")
    
    // update the data corresponding to the id with the new one in the request
    model.findByIdAndUpdate(req.body._id, req.body, 
        function(err, doc) {
            let message = {
                message: 'Document upated'
            };
            if (err) {
                message.message = err.message;
            }
            res.json(message);
        }
    );
};

exports.deleteById = function(req, res, next) {
    logger.log("controller deleteById");
    
    // get id from the parameters sent in the url
    model.findByIdAndRemove(req.params.id,
        function(err, doc) {
            let message = {
                message: 'Document removed'
            };
            if (err) {
                message.message = err.message;
            }
            res.json(message);
        }
    );
}

exports.dynamicSearch = function(req, res, next) {
    logger.log("controller dynamicSearch");

    let query = req.query;
    console.log(req.query);
    model.find(query)
    .then(function(docs){
        // the result is not empty we have a corresponding result
        if(docs.length) {
            res.json(docs);
        } else {
            res.json({message:`No result for the query ${JSON.stringify(query)}`});
        }
    });
};