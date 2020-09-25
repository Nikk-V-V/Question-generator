const {Schema, model, Types} = require("mongoose");

const questSchema = new Schema({
    title: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    creator: {type: Types.ObjectId, ref: 'User'},
    rating: {type: Number, default: 0},
});

module.exports = model("Quest", questSchema);

