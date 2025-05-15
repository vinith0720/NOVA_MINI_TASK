import db from '../models/index.js';
const { Company, Employee } = db;

export const getCompany = async (req, res) => {
  try {
    const results = await Company.findAll({
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'email', 'profileurl'],
          as: 'employees',
        },
      ],
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const company = await Company.findByPk(id, {
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'email', 'profileurl'],
          as: 'employees',
        },
      ],
    });
    if (!company) {
      return res.status(404).json({ msg: 'company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const postCompany = async (req, res) => {
  try {
    const { name, location } = req.body;
    const company = await Company.create({ name, location });
    res.status(201).json({ company });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const putCompanyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, location, employees } = req.body;

    const company = await Company.findByPk(id, {
      include: [{ model: Employee, as: 'employees' }],
    });

    if (!company) {
      return res.status(404).json({ message: 'company not found' });
    }
    const updatedname = name ?? company.name;
    const updatedlocation = location ?? company.location;
    await Company.update(
      { name: updatedname, location: updatedlocation },
      { where: { id } }
    );

    if (Array.isArray(employees) && employees.length > 0) {
      for (const employee of employees) {
        await Employee.update(
          { name: employee.name, email: employee.email },
          { where: { id: employee.id, companyId: id } }
        );
      }
    }
    const updatedcompany = await Company.findByPk(id, {
      include: [{ model: Employee, as: 'employees' }],
    });
    res.status(200).json(updatedcompany);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteCompanyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'company not found' });
    }
    await Company.destroy({ where: { id } });
    res.json({
      message: 'company and associated employees deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
