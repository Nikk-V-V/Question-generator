const {Schema, model, Types} = require("mongoose");

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    name: {type: String},
    surname: {type: String},
    photo: {type: String},
})

module.exports = model("User", userSchema);

