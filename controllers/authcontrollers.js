const user = require('../models/usermodels');
const hashPassword = require('../utils/hashPassword');
const validatePassword = require('../utils/validatePassword');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req,res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }    

    try {
        const existingUser = await user.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email is already in use' });
        }

        const hashedPassword = await hashPassword(password);

        const newdata = new user({
            username,
            email,
            password: hashedPassword,
        });

        await newdata.save();

        res.status(201).json({ message: 'Register success' });
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
};

exports.login = async (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const data = await user.findOne({ username });
        if (!data) {
            return res.status(400).json({ error: 'Username not found' });
        }

        const isMatch = await validatePassword(password, data.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid password' });
        }

        const token = generateToken(data);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};