import express from 'express';
const router = express.Router();

import {
  getEmployee,
  postEmployee,
  putEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
  postEmployeeProfileById,
  employeefoundornot,
} from '../controllers/employeecontroller.js';

import {
  validationErrormiddleware,
  idValidation,
  bodyValidationEmployee,
  putEmployeeValidation,
} from '../middleware/validations.js';

import authorization from '../middleware/jwt.js';

import awsUpload from '../middleware/multers.js';

router.get('/', authorization, getEmployee);

router.post(
  '/',
  authorization,
  bodyValidationEmployee,
  validationErrormiddleware,
  postEmployee
);

router.put(
  '/:id',
  authorization,
  putEmployeeValidation,
  validationErrormiddleware,
  putEmployeeById
);

router.delete(
  '/:id',
  authorization,
  idValidation,
  validationErrormiddleware,
  deleteEmployeeById
);

router.get(
  '/:id',
  authorization,
  idValidation,
  validationErrormiddleware,
  getEmployeeById
);

// profileurl for aws releted to employee

router.post(
  '/profile/:id',
  authorization,
  idValidation,
  validationErrormiddleware,
  employeefoundornot,
  (req, res, next) => {
    awsUpload(req, res, function (err) {
      if (err) {
        return res.status(400).json({ err });
      }
      next();
    });
  },
  postEmployeeProfileById
);

export default router;
