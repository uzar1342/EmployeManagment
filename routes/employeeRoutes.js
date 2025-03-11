const express = require('express');
const { createEmployee, getEmployees, deleteEmployee ,updateEmployee} = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createEmployee);
router.get('/', authMiddleware, getEmployees);
router.delete('/:id', authMiddleware, deleteEmployee);
router.put('/:id', authMiddleware, updateEmployee);
module.exports = router;
