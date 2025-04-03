import express from 'express';
const router = express.Router()

import {
  getEmployee,
  postEmployee,
  putEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
} from "../controllers/employeecontroller.js";

import {
  validationErrormiddleware,
  idValidation,
  bodyValidationEmployee,
  putEmployeeValidation,
} from "../middleware/validations.js";

import authorization from '../middleware/jwt.js';


router.get('/',authorization, getEmployee);

router.post("/" , authorization, bodyValidationEmployee, validationErrormiddleware, postEmployee);

router.put("/:id", authorization, putEmployeeValidation, validationErrormiddleware, putEmployeeById);

router.delete("/:id", authorization, idValidation, validationErrormiddleware, deleteEmployeeById); 

router.get("/:id", authorization, idValidation, validationErrormiddleware, getEmployeeById)


export default router;  