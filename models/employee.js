'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company',
      });
    }
  }
  Employee.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      profileurl: { type: DataTypes.STRING },
      companyId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Employee',
      tableName: 'employee',
      timestamps: true,
    }
  );
  return Employee;
};
