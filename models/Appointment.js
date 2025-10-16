const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  dentist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  chair: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  type: {
    type: String,
    enum: ['checkup', 'cleaning', 'filling', 'extraction', 'root-canal', 'cosmetic', 'emergency', 'consultation'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: String,
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: Date
}, { timestamps: true });

// Index for efficient querying
appointmentSchema.index({ appointmentDate: 1, dentist: 1 });
appointmentSchema.index({ patient: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
