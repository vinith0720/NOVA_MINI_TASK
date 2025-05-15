'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Employee, {
        foreignKey: 'companyId',
        as: 'employees',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Company.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      location: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'company',
      timestamps: true,
    }
  );
  return Company;
};
