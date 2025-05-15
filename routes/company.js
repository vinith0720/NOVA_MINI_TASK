import express from 'express';
var router = express.Router();

import {
  deleteCompanyById,
  getCompany,
  getCompanyById,
  postCompany,
  putCompanyById,
} from '../controllers/companycontroller.js';

import {
  idValidation,
  postCompanyValidation,
  putcompanyValidation,
  validationErrormiddleware,
} from '../middleware/validations.js';

import authorization from '../middleware/jwt.js';

router.get('/', authorization, getCompany);

router.post(
  '/',
  authorization,
  postCompanyValidation,
  validationErrormiddleware,
  postCompany
);

router.put(
  '/:id',
  authorization,
  putcompanyValidation,
  validationErrormiddleware,
  putCompanyById
);

router.delete(
  '/:id',
  authorization,
  idValidation,
  validationErrormiddleware,
  deleteCompanyById
);

router.get(
  '/:id',
  authorization,
  idValidation,
  validationErrormiddleware,
  getCompanyById
);

export default router;
