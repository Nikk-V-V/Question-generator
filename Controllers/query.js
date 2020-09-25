const Query             = require("../Models/Query");
const Quest             = require("../Models/Quest");
const errorHandler      = require('../utils/error');
const fs = require('fs')


module.exports.create = async (req, res) => {
    try {
        await console.log(req.body)

        const answers = req.body.answers.split(',')

        const file = JSON.parse(fs.readFileSync('./data/Query.json', 'utf-8'));

        const query = new Query({
            title: req.body.title,
            file: req.file ? req.file.path : '',
            quest: req.body.quest,
            answer: req.body.answer,
            answers: answers
        });

        file.push(query)

        console.log(file)
        fs.writeFileSync('./data/Query.json', JSON.stringify(file, null, '\t'));

        res.status(200).json({message: "Success", query})

    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.getAll = async (req, res) => {
    try {
        const file = await JSON.parse(fs.readFileSync('./data/Query.json', 'utf-8'));

        const query = [];
        await file.forEach(x => x.quest === req.params.id ? query.push(x): query)

        console.log(query)

        await res.status(200).json({
            message: "Успіх",
            query
        })
    } catch (e) {
        errorHandler(res, e)
    }
}