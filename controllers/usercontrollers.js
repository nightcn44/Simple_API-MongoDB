const user = require('../models/usermodels');

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const data = await user.create({ username, email, password });

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find({}).exec();
    
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};

// exports.getUserById = async (req, res) => {
//   const userId =  req.params.id;
//   try {
//     const user = await user.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json('Internal server error');
//   }
// };

// exports.updateUserById = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const updatedUser = await user.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json('Internal server error');
//   }
// };

// exports.deleteUserById = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const deletedUser = await user.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json('Internal server error');
//   }
// };