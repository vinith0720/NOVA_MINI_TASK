import db from '../models/index.js';
const {Employee} = db;



export const getEmployee = async (req, res) => {
    try {
        const Employees = await Employee.findAll();
        if (!Employees || Employees.length === 0) {
            return res.status(200).json({ msg: "No Employees found", Employees: [] });
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
            msg: "Employee created successfully",
            employee: newEmployee
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
            return res.status(404).json({ msg: "Employee not found" });
        }
        const updatedname = name ?? employee.name;
        const updatedemail = email ?? employee.email;
        const updatedcompanyId = companyId ?? employee.companyId;

        const [updatedRows] = await Employee.update(
            { name: updatedname, email: updatedemail, companyId: updatedcompanyId },
            { where: { id } }
        );

        if (updatedRows === 1) {
            return res.status(200).json({ msg: `Employee with ID ${id} updated successfully!` });
        } else {
            return res.status(400).json({ msg: "No changes made to the Employee!" });
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
            return res.status(404).json({ msg: "Employee not found" });
        }
        await Employee.destroy();
        res.status(200).json({ msg: `Employee with ID ${id} deleted successfully!` });

    } catch (error) {
        res.status(500).json({error});
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ msg: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error });
    }
};