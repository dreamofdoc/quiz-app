const Router = require('express');
const router = new Router();
const User = require('../mongo/models/UserModel');
require('dotenv').config();
const { hash, compare } = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 6').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) return res.status(400).json({ message: validationErrors.errors[0].msg });
            const { isAdmin, email, password } = req.body;
            const hashedPassword = await hash(password, 8);
            const user = new User({ isAdmin, email, password: hashedPassword });
            await user.save();
            res.json({ user })
        } catch (error) {
            res.status(400).json({ error });
        }
    }
);

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: 'Invalid email or password' });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({
            token,
            user,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id });
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
);

module.exports = router;