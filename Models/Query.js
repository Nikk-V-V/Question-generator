const {Schema, model, Types} = require("mongoose");

const querySchema = new Schema({
    title: {type: String, required: true},
    file: {type: String, required: false},
    quest: {type: Types.ObjectId, ref: "Quest"},
    answer: {type: String, required: true},
    image: {type: String, required: false},
    answers: [],
})

module.exports = model("Query", querySchema);

