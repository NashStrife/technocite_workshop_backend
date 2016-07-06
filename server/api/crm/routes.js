let router = require('express').Router();
let controller = require('./controller');


router.route('/')
.get(controller.getCustomer)
.post(controller.postCustomer);

router.route('/admin')
.get(controller.getAdmin)
.put(controller.updateAdmin);

// we want dynamic params so we don't use /:search but the old school /search
router.route('/search')
.get(controller.dynamicSearch);

router.route('/:id')
.put(controller.updateCustomer)
.delete(controller.deleteById);


module.exports = router;