'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('company', 
        [
          {name: 'novastrid',location: "madurai",createdAt: new Date(),updatedAt: new Date(),},
          {name: 'samsung',location: "new york",createdAt: new Date(),updatedAt: new Date(),},
          {name: 'vivo',location: "germany",createdAt: new Date(),updatedAt: new Date(),},
          {name: 'HCL',location: "madurai",createdAt: new Date(),updatedAt: new Date(),},
          {name: 'TCS',location: "chennai",createdAt: new Date(),updatedAt: new Date(),},
        ],
        {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('company', null, {});  
  }
};
