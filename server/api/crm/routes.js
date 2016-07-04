let router = require('express').Router();
let controller = require('./controller');


router.route('/')
.get(controller.get)
.post(controller.post)
.put(controller.update);

// we want dynamic params so we don't use /:search but the old school /search
router.route('/search')
.get(controller.dynamicSearch);

router.route('/:id')
.delete(controller.deleteById);


module.exports = router;