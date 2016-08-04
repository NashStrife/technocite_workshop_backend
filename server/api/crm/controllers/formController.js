let logger = require(`${process.cwd()}/server/utils/logger`);
// get an instance of the model of our db
let model = require('../model');
let multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        logger.log("--- FORM CONTROLLER : destination");
        cb(null, 'public/images/uploads/');
    },
    filename: function (req, file, cb) {
        logger.log("--- FORM CONTROLLER : filename");
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]); // define the file name [name from the form-timestamp.extension]
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');


exports.uploadImage = function(req, res, next) {
    logger.log("--- FORM CONTROLLER : uploadImage");
    upload(req,res,function(err){
        if(err){
                res.json({error_code:1,err_desc:err});
                logger.log(err);
                return;
        }
            res.json({error_code:0,err_desc:null});
    });
};

// manque :
// ajout db