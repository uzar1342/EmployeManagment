const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { name, position, salary } = req.body;

    // Validation: Check if the same user already has an employee with the same name
    const existingEmployee = await Employee.findOne({ name, createdBy: req.user.id });
    if (existingEmployee) {
      return res.status(400).send('You already have an employee with this name'); // 400 Bad Request
    }

    const employee = new Employee({ name, position, salary, createdBy: req.user.id });
    await employee.save();
    res.status(201).send('Employee created successfully'); // 201 Created
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = req.user.role === 'Admin' ? await Employee.find() : await Employee.find({ createdBy: req.user.id });
    res.status(200).json(employees); // 200 OK
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.status(200).send('Employee deleted successfully'); // 200 OK
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, salary } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).send('Employee not found'); // 404 Not Found

    // Only Admin or the creator can update
    if (req.user.role !== 'Admin' && employee.createdBy.toString() !== req.user.id)
      return res.status(403).send('Access denied'); // 403 Forbidden

    // Validation: Check if the same user already has another employee with the same name
    const existingEmployee = await Employee.findOne({ name, createdBy: req.user.id, _id: { $ne: id } });
    if (existingEmployee) {
      return res.status(400).send('You already have an employee with this name'); // 400 Bad Request
    }

    employee.name = name;
    employee.position = position;
    employee.salary = salary;
    await employee.save();

    res.status(200).send('Employee updated successfully'); // 200 OK
  } catch (error) {
    res.status(400).send(error);
  }
};