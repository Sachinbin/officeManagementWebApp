import express from 'express';
import Employee from '../models/Employee.js';
import Department from '../models/Department.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const employees = await Employee.find().populate('department');
  const departments = await Department.find();
  res.render('employee', { employees, departments });
});

router.post('/add', auth, async (req, res) => {
  const { name, email, age, department, country, state, city } = req.body;
  await Employee.create({ name, email, age, department, country, state, city });
  res.redirect('/employees');
});

router.post('/delete/:id', auth, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/employees');
});

export default router;
