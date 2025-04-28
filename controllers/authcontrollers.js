const User = require('../models/user');
const hashPassword = require('../utils/hashPassword');
const validatePassword = require('../utils/validatePassword');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req,res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('Username, email, and password are required');
    }    

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email is already in use' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Register success' });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

exports.login = async (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Username not found' });
        }

        const isMatch = await validatePassword(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid password' });
        }

        const token = generateToken(user);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};