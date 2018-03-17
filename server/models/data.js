var mongoose   = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
	owner:        { type: String, required: true, trim: true },
	txHash:       { type: String, required: true, trim: true },
	title:        { type: String, required: true, trim: true },
	imageurl:     { type: String, required: false, trim: true },
	description:  { type: String, required: true, trim: true },
	timestamp:    { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Data', DataSchema);

