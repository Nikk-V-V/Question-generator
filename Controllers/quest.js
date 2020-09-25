const Quest             = require('../Models/Quest');
const errorHandler      = require('../utils/error');
const fs = require('fs')

module.exports.create = async (req, res) => {
    try {
        const {title, description} = req.body;

        const file = JSON.parse(fs.readFileSync('./data/Quest.json', 'utf-8'));

        const questC = await file.find(x=> x.title === title);

        if (questC) return res.status(400).json({message: "Така назва вже зайнята, будь ласка оберіть іншу"})

        const quest = new Quest({
            title,
            description,
            creator: req.user.userId,
            image: req.file ? req.file.path : ''
        });

        file.push(quest)

        fs.writeFileSync('./data/Quest.json', JSON.stringify(file, null, '\t'));

        res.status(200).json({message: "Ваш квест створенно", quest})

    } catch (e) {
         errorHandler(res, e)
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const tasks = JSON.parse(fs.readFileSync('./data/Quest.json', 'utf-8'));

        if (tasks[0]) {
            res.status(200).json({message: 'Отримано', tasks, success: "Success"});
        } else  {
            res.status(400).json({message: 'Немає'})
        }

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync('./data/Quest.json', 'utf-8'));

        const task = file.find(x => req.params.id === x._id)

        console.log(task)

        res.status(200).json({task, success: 'Success'})
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Quest.remove({_id: req.params.id})

        res.status(200).json({message: 'Удалено'})

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) => {
    const updated = {
        title: req.body.title,
        description: req.body.description
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const quest = await Quest.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
        res.status(200).json(quest)
    } catch (e) {
        errorHandler(res, e)
    }
}
