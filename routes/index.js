const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

// index  get
router.get('/', index_controller.index_get);

// send 404 to non existing routes
router.get('*', index_controller.nonexisting);

module.exports = router;