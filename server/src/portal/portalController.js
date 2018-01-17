const path = require('path');
const csvtojson = require('csvtojson');
const portalService = require('./portalService');

var exports = module.exports = {};

exports.uploadCsv = function (req, res) {

  console.log('portal controller: upload csv');

  var file = req.files.csvfile;
  var filepath = path.join(appRoot, 'server/upload/' + file.name);

  file.mv(filepath, function (err) {
    if (err) {
      res.send('error occurred');
    } else {
      res.send('Done!');
    }

  })
};

exports.importCsv = function (req, res) {
  console.log('portalController: importCsv');
  var filepath = path.join(appRoot, 'server/upload/');
  var csvFilePath = path.join(filepath, 'test.csv');
  csvtojson()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
      //
      portalService.createRecord(jsonObj)
        .then(data => res.status(200).send(data))
        .catch('an error occurred');
    })
    .on('done', (error) => {
      console.log('end')
    })
};

exports.findAllRecords = function (req, res) {

  portalService.findAllRecords()
    .then(data => res.status(200).send(data));
}

exports.findRecordById = function (req, res) {

  var id = req.params ? req.params.id : undefined;

  console.log('portalController: identifier - ' + id)

  if (!id) {
    res.status(400).send("Retrieve Operation Error: Invalid Identifier");
  } else {
    var onErr = (err) => {
      res.status(500).send(err);
    };

    var onSuccess = (data) => {
      var response = res.status(200);
      console.log('onSuccess: Record Found');
    };

    portalService.findRecordById(id).then(data => res.status(200).send(data));
  }
}

exports.findRecordByQuery = function (req, res) {

  var param = req.params ? req.params.param : undefined;
  console.log('portalController: findRecordByQuery - param: ' + param);
  var query = req.query ? req.query.query : undefined;
  console.log('portalController: findRecordByQuery - query: ' + query);
  var expr = query;

  if (!expr) {
    //
    res.status(400).send("Query Operation Error: Invalid parameter(s)");
  } else {
    //
    var onErr = (err) => {
      res.status(500).send(err);
    };

    var onSuccess = (data) => {
      var response = res.status(200);
      console.log('onSuccess: Record(s) Found');
    };

    portalService.findRecordByQuery(expr)
      .then(data => res.status(200).send(data));
  }
}

exports.createRecord = function (req, res) {

  console.log('portal controller: create record');
  var record = req.body ? req.body : undefined;

  if (!record) {
    res.status(400).send("Empty record");
  } else {
    portalService.createRecord(record)
      .then(data => res.status(200).send(data))
      .catch('an error occurred');
  }
}

exports.updateRecord = function (req, res) {

  console.log('portal controller: update record');
  var record = req.body ? req.body : undefined;

  if (!record) {
    res.status(400).send("Empty record");
  } else {
    var onErr = (err) => {
      res.status(500).send(err);
    };

    var onSuccess = (data) => {
      var response = res.status(200);
      response.setHeader('Expires', '-1');
      response.send(data);
      console.log('onSuccess: Record Saved!');
    };

    portalService.updateRecord(record, onErr, onSuccess);

  }
}

exports.deleteRecord = function (req, res) {

  console.log('portal controller: delete record');
  var id = req.params ? req.params.id : undefined;

  if (!id) {
    res.status(400).send("Delete Operation Error: Invalid Identifier");
  } else {
    var onErr = (err) => {
      res.status(500).send(err);
    };

    var onSuccess = (data) => {
      var response = res.status(200);
      response.redirect('/');
      console.log('onSuccess: Record Deleted!');
    };

    portalService.deleteRecord(id, onErr, onSuccess);
  }
}