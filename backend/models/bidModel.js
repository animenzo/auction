const mongoose = require("mongoose");

const bidSchema = mongoose.Schema({
	auctionItemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AuctionItem",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	bidAmount: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(new Date().getTime()),
	},
});

module.exports = mongoose.model("Bid", bidSchema);