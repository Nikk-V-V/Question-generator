const User = require('../models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs')

module.exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const file = JSON.parse(fs.readFileSync('./data/User.json', 'utf-8'));

        const user = await file.find(x => x.email === email)

        if (!user) return res.status(400).json({ message: 'Пользователь не найден' })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })

        const token = jwt.sign(
            { userId: user.id },
            config.get('secret'),
            { expiresIn: '24h' }
        )

        res.status(200).json({ success: 'Success',token, userId: user.id, user: user})

    } catch (e) {
        res.status(500).json({ message : "Щось не так, спробуй ще раз" });
    }
}

module.exports.register = async (req, res) => {
    try {

        const {email, password, login} = req.body;

        const file = JSON.parse(fs.readFileSync('./data/User.json', 'utf-8'));

        const candidate = file.find(x => x.email === email);

        if (candidate) return  res.status(400).json({message: "Такий користувач вже існує"});

        const hashedPassword = await bcrypt.hash(password,12);

        const user = new User({email, password: hashedPassword, login});

        file.push(user)

        fs.writeFileSync('./data/User.json', JSON.stringify(file, null, '\t'));

        res.status(200).json({message: "Успіх", user})

    } catch (e) {
        res.status(500).json(e.message);
    }
}

module.exports.getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json({ message : e.message});
    }
}



