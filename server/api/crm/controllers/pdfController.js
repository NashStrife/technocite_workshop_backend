let logger = require(`${process.cwd()}/server/utils/logger`);

var path = require('path');
var phantomjs = require('phantomjs-prebuilt');
var phantomPath = phantomjs.path;

let fs = require('fs');
let pdf = require('html-pdf');
let Handlebars = require('handlebars');

exports.testPdf = function(req, res, next) {
    
    var html = fs.readFileSync('public/documents/templates/test.hbs', 'utf8');
    var options = { format: 'A4' };
    pdf.create(html, options).toFile('public/tmp/pdf_from_html.pdf', function(err, data) {
        if(err){
                res.json({error_code:1,err_desc:err});
                logger.log(err);    
                return;
        }
            res.json({error_code:0,err_desc:null});
            logger.log('PDF Created on ' + data);
    });
}

exports.createPdf = function(req, res, next) {

    var source = fs.readFileSync('public/documents/templates/body.hbs', 'utf8');
    var template = Handlebars.compile(source);
    var data = { 
        "page" : {
            "style" : "documents/templates/main.css"
        },
        "name": "John", 
        "hometown": "Somewhere, TX",
        "kids": [{
            "name": "Jimmy", 
            "age": "12"
        },{
            "name": "Sally", 
            "age": "4"
        }]
    };
    var html_with_data = template(data);
    
    logger.log(html_with_data);

    var options = config = {
        "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
        "orientation": "portrait", // portrait or landscape 
        
        "border": {
            "top": "10px",            // default is 0, units: mm, cm, in, px 
            "right": "5px",
            "bottom": "10px",
            "left": "5px"
        },
        
        // File options 
        "type": "pdf",             // allowed file types: png, jpeg, pdf 
    };

    pdf.create(html_with_data, options).toFile('public/tmp/pdf_from_hbs.pdf', function(err) {
        if(err){
                res.json({error_code:1,err_desc:err});
                logger.log(err);    
                return;
        }
            res.json({error_code:0,err_desc:null});
            logger.log('PDF Created !');
    });
}

exports.createPhantomPdf = function(req, res, next) {
    logger.log("Create PDF");
    logger.log(phantomPath);
    logger.log(req.body);

    var manifest = {
        phantomjsPath: phantomPath, // Optional
        templates: {
            body: 'public/documents/templates/body.hbs', // Body is required as its the entry point
            // If header is defined it will be the page header
            // Note: phantomSettings.paperSize.header.height must also be set
            // header: 'public/documents/templates/header.hbs',
            // If footer is defined it will be the page header
            // Note: phantomSettings.paperSize.footer.height must also be set
            // footer: 'public/documents/templates/footer.hbs',
            // This is an example of having a parcial view
            // product: 'public/documents/templates/product.hbs'
        },
        helpers: 'public/documents/templates/helpers.js', // Handlebars helper
        helperVariables: {}, // Additional data to be passed in the helper such as local
        less: 'public/documents/templates/design.less', // Less file to render into css
        output: 'public/documents/tmp/foo.pdf', // This is the destination of the newly created PDF
        // Settings to be passed into phantom
        // List of settings: http://phantomjs.org/api/webpage/
        phantomSettings: {
            paperSize: {
                format: 'A4',
                orientation: 'portrait',
                margin: {
                    top: '0.25in',
                    right: '0.5in',
                    bottom: '0.25in',
                    left: '0.5in'
                },
                header: {
                    height: '0.5in'
                },
                footer: {
                    height: '0.5in'
                }
            }
        }
    };

    var data = { // Put any data you want to be exposed to your handlebars template
        products: ['soccer ball', 'baseball', 'football'],
        category: 'Balls'
    };
    var pdf = new PhantomPDF(manifest, data, function(err){
        if(err){
                res.json({error_code:1,err_desc:err});
                logger.log(err);
                return;
        }
            res.json({error_code:0,err_desc:null});
            logger.log('PDF Created !');
    });
    
}