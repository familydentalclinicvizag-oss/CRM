const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
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
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  treatmentDate: {
    type: Date,
    default: Date.now
  },
  procedure: {
    type: String,
    required: true
  },
  toothChart: {
    type: Map,
    of: {
      status: {
        type: String,
        enum: ['healthy', 'cavity', 'filled', 'root-canal', 'crown', 'bridge', 'implant', 'missing', 'extracted']
      },
      notes: String,
      surfaces: [String] // mesial, distal, occlusal, buccal, lingual
    }
  },
  diagnosis: String,
  treatmentPlan: String,
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'cancelled'],
    default: 'planned'
  },
  clinicalNotes: String,
  beforePhotos: [String],
  afterPhotos: [String],
  cost: {
    type: Number,
    required: true
  },
  consent: {
    obtained: {
      type: Boolean,
      default: false
    },
    signature: String,
    date: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);
