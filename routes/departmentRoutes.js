import express from 'express';
import Department from '../models/Department.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const departments = await Department.find();
  res.render('department', { departments });
});

router.post('/add', auth, async (req, res) => {
  const { name, description } = req.body;
  await Department.create({ name, description });
  res.redirect('/departments');
});

router.post('/delete/:id', auth, async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.redirect('/departments');
});

export default router;
