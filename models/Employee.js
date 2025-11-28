import mongoose from 'mongoose';

const empSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  country: String,
  state: String,
  city: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Employee', empSchema);
