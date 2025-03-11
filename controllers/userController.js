const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).send('Access denied');
  }

  const users = await User.find();
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'Admin') {
    return res.status(403).send('Access denied');
  }

  await User.findByIdAndDelete(id);
  res.send('User deleted successfully');
};

exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
  
    if (req.user.role !== 'Admin') {
      return res.status(403).send('Access denied');
    }
  
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    user.role = role;
    await user.save();
    res.send('User role updated successfully');
  };
  exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    res.json(user);
  };