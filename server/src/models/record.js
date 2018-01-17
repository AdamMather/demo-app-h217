var mongoose = require('mongoose');

// mongoose schema
var recordSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: false
    },
});

// compile schema into model (class)
var record = mongoose.model('Record', recordSchema);

module.exports = record;