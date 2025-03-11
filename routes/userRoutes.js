const express = require('express');
const { getAllUsers, deleteUser,updateUserRole ,getUserById} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/:id', authMiddleware, updateUserRole);
router.get('/:id', authMiddleware, getUserById);
module.exports = router;
