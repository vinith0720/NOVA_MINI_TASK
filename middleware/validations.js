import { body, param, validationResult } from 'express-validator';

export const validationErrormiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// jwt validation

export const jwttokenvalidation = [
  body('name')
    .notEmpty()
    .isString()
    .trim()
    .withMessage('Company name is required'),
];

export const idValidation = [
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID'),
];

// employee validations

export const bodyValidationEmployee = [
  body('name')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('provide valid name with minimum length 3'),
  body('email')
    .notEmpty()
    .isEmail()
    .trim()
    .normalizeEmail()
    .withMessage('provide valid email address'),
  body('companyId')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('provide valid companyId '),
];

export const putEmployeeValidation = [
  ...idValidation,
  body('name')
    .optional()
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('provide valid name with minimum length 3'),
  body('email')
    .optional()
    .notEmpty()
    .isEmail()
    .trim()
    .normalizeEmail()
    .withMessage('provide valid email address'),
  body('companyId')
    .optional()
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('provide valid companyId '),
];

// company validation

export const postCompanyValidation = [
  body('name')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('provide a valid company name'),
  body('location')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('provide a valid company location'),
];

export const putcompanyValidation = [
  ...idValidation,
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company name cannot be empty')
    .isString()
    .withMessage('Company name must be a string')
    .isLength({ min: 3 })
    .withMessage('Company name must be at least 3 characters long'),

  body('location')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company location cannot be empty')
    .isString()
    .withMessage('Company location must be a string')
    .isLength({ min: 3 })
    .withMessage('Company location must be at least 3 characters long'),

  body('employees')
    .optional()
    .isArray()
    .withMessage('Employees must be an array'),

  body('employees.*.id')
    .if(body('employees').exists())
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),

  body('employees.*')
    .if(body('employees').exists())
    .custom((employee) => {
      if (!employee.name && !employee.email) {
        throw new Error('Either employee name or email is required');
      }
      return true;
    }),

  body('employees.*.name')
    .optional()
    .trim()
    .isString()
    .withMessage('Post name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Post name must be between 3 and 100 characters'),

  body('employees.*.email')
    .optional()
    .isEmail()
    .withMessage('Provide a valid email address')
    .isLength({ min: 10, max: 100 })
    .withMessage('Email must be between 10 and 100 characters')
    .normalizeEmail(),
];
