const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  medicalHistory: {
    allergies: [String],
    medications: [String],
    conditions: [String],
    bloodGroup: String
  },
  dentalHistory: {
    lastVisit: Date,
    previousTreatments: [String],
    notes: String
  },
  documents: [{
    type: {
      type: String,
      enum: ['xray', 'photo', 'report', 'consent', 'other']
    },
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  insurance: {
    provider: String,
    policyNumber: String,
    validUntil: Date
  },
  source: {
    type: String,
    enum: ['referral', 'online', 'walk-in', 'advertisement', 'other']
  }
}, { timestamps: true });

// Generate unique patient ID
patientSchema.pre('save', async function(next) {
  if (!this.patientId) {
    const count = await mongoose.model('Patient').countDocuments();
    this.patientId = `P${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Patient', patientSchema);
