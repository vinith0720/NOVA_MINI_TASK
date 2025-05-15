import express from 'express';
var router = express.Router();
import jwt from 'jsonwebtoken';
import { secret } from '../middleware/jwt.js';
import {
  jwttokenvalidation,
  validationErrormiddleware,
} from '../middleware/validations.js';
import db from '../models/index.js';

const { Company, Employee } = db;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send('Express is working !!!');
});

router.post(
  '/',
  jwttokenvalidation,
  validationErrormiddleware,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const company = await Company.findOne({ where: { name } });
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      const token = jwt.sign(
        { id: company.id, name: company.name, location: company.location },
        secret,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
