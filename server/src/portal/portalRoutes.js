
const express = require('express');
const router = express.Router();

const path = require('path');

//require multer for the file uploads
const multer = require('multer');

const UPLOAD_PATH = './server/upload/';
const upload = multer({ dest: UPLOAD_PATH }).single('csvfile');

const portalController = require('./portalController');

router.get('/', portalController.findAllRecords);

router.get('/:id', portalController.findRecordById);

router.get('/search/:param', portalController.findRecordByQuery);

router.post('/', portalController.createRecord);

router.patch('/', portalController.updateRecord);

router.delete('/:id', portalController.deleteRecord);

router.post('/file/upload', portalController.uploadCsv);

router.get('/csv/import', portalController.importCsv);

module.exports = router;