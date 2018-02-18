const express = require('express');
const router = express.Router();
const datadateController = require('../controller/datadateController')
const istoken = require('../helpers/checker')

router.get('/',datadateController.read)
router.post('/',datadateController.add)
router.post('/search',datadateController.search)
router.put('/:id',datadateController.edit)
router.delete('/:id',datadateController.destroy)
router.get('/:id',datadateController.findbyid)

module.exports = router;
