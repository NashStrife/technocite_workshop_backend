let router = require('express').Router();

router.use('/restos', require('./restos/routes'));

module.exports = router;