const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  const { name, position, salary } = req.body;
  const employee = new Employee({ name, position, salary, createdBy: req.user.id });
  await employee.save();
  res.send('Employee created successfully');
};

exports.getEmployees = async (req, res) => {
  const employees = req.user.role === 'Admin' ? await Employee.find() : await Employee.find({ createdBy: req.user.id });
  res.json(employees);
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.send('Employee deleted successfully');
};
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;
  
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).send('Employee not found');
  
    // Only Admin or the creator can update
    if (req.user.role !== 'Admin' && employee.createdBy.toString() !== req.user.id)
      return res.status(403).send('Access denied');
  
    employee.name = name;
    employee.position = position;
    employee.salary = salary;
    await employee.save();
  
    res.send('Employee updated successfully');
  };