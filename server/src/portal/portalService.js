const path = require('path');
const mongoose = require('mongoose');

const Record = require('../models/record.js');

var exports = module.exports = {};

//Find all records
exports.findAllRecords = () => Record.find({})
    .exec();

//Find record by id
exports.findRecordById = (id) => Record.findById(id)
    .exec();

//Find record by search
exports.findRecordByQuery = (search) => {

    console.log('portalService: findRecordByQuery - ' + search);

    var query = {};

    if (search != null) {

        let rxSearch = new RegExp(search.toLowerCase().trim(), 'i')

        query = {
            $or: [
                { 'firstName': rxSearch },
                { 'lastName': rxSearch },
                { 'emailAddress': rxSearch }
            ]
        }
    }

    return Record.find(query)
};

// create record
exports.createRecord = function (record) {

    /*
     *  create mongoose schema
     *  need to work out how this can be executed one time only
     */
    /*
    // mongoose schema
    var collectionSchema = mongoose.Schema({
        name: String
    });
    */

    // compile schema into model (class)
    var collection = mongoose.model('Record');

    // create document
    var doc = new collection(record);

    // save document to MongoDB
    return doc.save(function (err, record) {
        if (err) return console.error(err);
        console.log('Record Created!');
    });
};

exports.updateRecord = function (record, onErr, onSuccess) {

    console.log('portalService: update record');

    // compile schema into model (class)
    var collection = mongoose.model('Record');

    var query = { _id: record._id };
    collection.findOneAndUpdate(query, { firstName: record.firstName, lastName: record.lastName, emailAddress: record.emailAddress }, function (err, data) {
        if (err) return onErr;
        return onSuccess;
    });
};

exports.deleteRecord = function (id, onErr, onSuccess) {

    // compile schema into model (class)
    var collection = mongoose.model('Record');

    collection.findOneAndRemove({ '_id': id }, function (err, data) {
        if (err) return onErr;
        return onSuccess;
    });
};

exports.uploadCsv = function (file, onErr, onSuccess) {

    var filepath = path.join(appRoot, 'server/upload/' + file.name);

    file.mv(filepath, function (err) {
        if (err) return onErr;
        console.log('upload success!');
        return onSuccess;
    })
}