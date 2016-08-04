let router = require('express').Router();
let controller = require('./controllers/controller');
let loginController = require('./controllers/loginController');
let formController = require('./controllers/formController');


router.route('/')
.get(controller.getCustomer)
.post(controller.postCustomer);

// we want dynamic params so we don't use /:search but the old school /search
router.route('/search')
.get(controller.dynamicSearch);

router.route('/:id')
.put(controller.updateCustomer)
.delete(controller.deleteById);

router.route('/admin')
.get(controller.getAdmin);

router.route('/admin/:id')
.put(controller.updateAdmin);

router.route('/params')
.get(controller.getParams);

router.route('/login')
.get(loginController.checkPwd);

router.route('/createPdf')
.get(controller.createPdf);


router.route('/upload')
.post(formController.uploadImage);


module.exports = router;


/** API path that will upload the files */
// app.post('/upload', function(req, res) {
//     upload(req,res,function(err){
//         if(err){
//                 res.json({error_code:1,err_desc:err});
//                 return;
//         }
//             res.json({error_code:0,err_desc:null});
//     });
// });