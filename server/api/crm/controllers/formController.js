let logger = require(`${process.cwd()}/server/utils/logger`);
// get an instance of the model of our db
let model = require('../model');
let multer = require('multer');
let fsPath = require('fs-path');
const dest_folder = 'public/images/uploads/';

// =============================================================
// /!\ THE TEXT FIELDS MUST BE SEND BEFORE THE IMAGE FIELDS !!!!
// =============================================================

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        logger.log("--- FORM CONTROLLER : storage.destination");
        if(req.body.folder) {
            let destination_path = 'public/'+req.body.folder;
            fsPath.mkdir(destination_path, function(err){
                logger.log('folder has been created');
            });
            cb(null, req.body.folder);

        }
        else
            cb(null, dest_folder);
    },
    filename: function (req, file, cb) {
        logger.log("--- FORM CONTROLLER : storage.filename");
        // console.log(req.body);
        // var datetimestamp = Date.now();
        // define the file name [name from the form-timestamp.extension]
        // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]); 
        cb(null, req.body.filename + '.jpg');
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file'); // req.file is the file named `file` 


exports.uploadImage = function(req, res, next) {
    // req.body will hold the text fields, if there were any
    
    logger.log("--- FORM CONTROLLER : uploadImage");
    upload(req, res, function(err){
        // req.file is the file named `file` [corresponding to the .single() method]
        // logger.log(req.body);
        // logger.log(req.file);
        if(err){
                res.json({error_code:1,err_desc:err});
                logger.log(err);
                return;
        }
            res.json({error_code:0,err_desc:null});
    });
};