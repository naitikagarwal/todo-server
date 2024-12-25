const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  subtaskName: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskName: { type: String, required: true },
  taskPriority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  taskTime: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  subtasks: [SubtaskSchema],
});

module.exports = mongoose.model('Task', TaskSchema);
