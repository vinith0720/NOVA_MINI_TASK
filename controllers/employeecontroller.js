import db from '../models/index.js';
import { bucket } from '../middleware/multers.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
const { Employee } = db;

export const getEmployee = async (req, res) => {
  try {
    const Employees = await Employee.findAll();
    if (!Employees || Employees.length === 0) {
      return res.status(200).json({ msg: 'No Employees found', Employees: [] });
    }
    res.status(200).json(Employees);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const postEmployee = async (req, res) => {
  try {
    const { name, email, companyId } = req.body;
    const newEmployee = await Employee.create({ name, email, companyId });
    res.status(201).json({
      msg: 'Employee created successfully',
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const putEmployeeById = async (req, res) => {
  try {
    const { name, email, companyId } = req.body;
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    const updatedname = name ?? employee.name;
    const updatedemail = email ?? employee.email;
    const updatedcompanyId = companyId ?? employee.companyId;

    const [updatedRows] = await Employee.update(
      { name: updatedname, email: updatedemail, companyId: updatedcompanyId },
      { where: { id } }
    );

    if (updatedRows === 1) {
      return res
        .status(200)
        .json({ msg: `Employee with ID ${id} updated successfully!` });
    } else {
      return res.status(400).json({ msg: 'No changes made to the Employee!' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteEmployeeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    await Employee.destroy({ where: { id } });
    res
      .status(200)
      .json({ msg: `Employee with ID ${id} deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// employee route for profilepic

export const employeefoundornot = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const postEmployeeProfileById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!req.file || !req.file.location) {
      return res.status(400).json({ message: 'Profile image is required' });
    }
    const profileurl = req.file.location;
    const [updatedCount] = await Employee.update(
      { profileurl },
      { where: { id } }
    );

    if (updatedCount === 1) {
      return res.status(200).json({
        message: 'File uploaded successfully',
        profileurl,
      });
    } else {
      return res
        .status(400)
        .json({ message: 'No changes made to the Employee!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
};
