const bcrypt = require('bcrypt');

// hash password
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

module.exports = hashPassword;