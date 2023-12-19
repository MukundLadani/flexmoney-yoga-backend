const mongoose = require("mongoose");

const user = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	batch: {
		type: String,
		required: true,
	},
});

const YogaDB = mongoose.model("yogaDB", user);

module.exports = { YogaDB };
