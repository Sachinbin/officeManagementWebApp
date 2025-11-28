import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import { auth } from './middlewares/auth.js';

dotenv.config();
const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);
app.use('/location', locationRoutes);

app.get('/', (req, res) => res.redirect('/dashboard'));
app.get('/dashboard', auth, (req, res) => res.render('dashboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on', PORT));
