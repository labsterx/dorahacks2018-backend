'use strict';

var DataModel = require('../models').Data;

exports.index = function(req, res) {
	DataModel.find({}, {}, { sort: { timestamp: 1 }})
	// .populate('category')
	.exec(function(err, data) {
		if (err) {
			res.json(500, {msg: 'Error getting links.', err: err});
		}
		else {
			res.json(data);
		}
	});
};

exports.findById = function(req, res) {
	DataModel.findById(req.params.id)
	// .populate('category')
	.exec(function(err, data) {
		if (err) {
			res.json(500, {msg: 'Error getting Link.', err: err});
		}
		else {
			res.json(data);
		}
	});
};

exports.update = function(req, res) {
	DataModel.findById(req.params.id)
	.exec(function(err, data) {
		if (err) {
			res.json(500, {msg: 'Error getting link.', err: err});
		}
		else {
			if (req.body.hasOwnProperty('owner')) {
				data.owner = req.body.owner;
			}
			if (req.body.hasOwnProperty('txHash')) {
				data.txHash = req.body.txHash;
			}			
			if (req.body.hasOwnProperty('title')) {
				data.title = req.body.title;
			}
			if (req.body.hasOwnProperty('imageurl')) {
				data.imageurl = req.body.imageurl;
			}			
			if (req.body.hasOwnProperty('description')) {
				data.description = req.body.description;
			}
			data.save(function(err) {
				if (err) {
					res.json(500, {msg: 'Error updating link.', err: err});
				}
				else {
          res.json({ message: 'link updated!' });
        }
			});

		}
	});
};

exports.delete = function(req, res) {
	DataModel.remove({ _id: req.params.id })
	.exec(function(err, data) {
		if (err) {
			res.json(500, {msg: 'Error deleting link.', err: err});
		}
		else {
			res.json({ message: 'link deleted!' });
		}
	});
};


exports.create = function(req, res) {
	var newData = new DataModel({
		owner: req.body.owner,
		txHash: req.body.txHash,
		title: req.body.title,
		imageurl: req.body.imageurl,
		description: req.body.description
	})
	newData.save(function(err) {
		if (err){
			res.json(500, {msg: 'Error createing new link.', err: err});
		} else {
			res.json(newData);
		}
	});
};