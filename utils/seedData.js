const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Treatment = require('../models/Treatment');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await Treatment.deleteMany({});

    // Create Users
    const users = await User.create([
      {
        name: 'Dr. Praharsh',
        email: 'admin@clinic.com',
        password: 'admin123',
        role: 'admin',
        phone: '9876543210',
        specialization: 'General Dentistry'
      },
      {
        name: 'Dr. Sarah Johnson',
        email: 'dentist@clinic.com',
        password: 'dentist123',
        role: 'dentist',
        phone: '9876543211',
        specialization: 'Orthodontics'
      },
      {
        name: 'Receptionist Mary',
        email: 'reception@clinic.com',
        password: 'reception123',
        role: 'receptionist',
        phone: '9876543212'
      }
    ]);

    // Create Patients
    const patients = await Patient.create([
      {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        dateOfBirth: new Date('1985-05-15'),
        gender: 'Male',
        phone: '9123456789',
        email: 'rajesh@example.com',
        address: { city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
        source: 'referral'
      },
      {
        firstName: 'Priya',
        lastName: 'Sharma',
        dateOfBirth: new Date('1990-08-20'),
        gender: 'Female',
        phone: '9123456790',
        email: 'priya@example.com',
        address: { city: 'Delhi', state: 'Delhi', pincode: '110001' },
        source: 'online'
      },
      {
        firstName: 'Amit',
        lastName: 'Patel',
        dateOfBirth: new Date('1978-03-10'),
        gender: 'Male',
        phone: '9123456791',
        email: 'amit@example.com',
        address: { city: 'Bangalore', state: 'Karnataka', pincode: '560001' },
        source: 'walk-in'
      },
      {
        firstName: 'Sneha',
        lastName: 'Reddy',
        dateOfBirth: new Date('1995-11-25'),
        gender: 'Female',
        phone: '9123456792',
        email: 'sneha@example.com',
        address: { city: 'Hyderabad', state: 'Telangana', pincode: '500001' },
        source: 'advertisement'
      },
      {
        firstName: 'Vikram',
        lastName: 'Singh',
        dateOfBirth: new Date('1982-07-30'),
        gender: 'Male',
        phone: '9123456793',
        email: 'vikram@example.com',
        address: { city: 'Chennai', state: 'Tamil Nadu', pincode: '600001' },
        source: 'referral'
      }
    ]);

    // Create Appointments
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await Appointment.create([
      {
        patient: patients[0]._id,
        dentist: users[0]._id,
        appointmentDate: today,
        startTime: '09:00',
        endTime: '09:30',
        chair: 1,
        type: 'checkup',
        status: 'confirmed'
      },
      {
        patient: patients[1]._id,
        dentist: users[1]._id,
        appointmentDate: today,
        startTime: '10:00',
        endTime: '10:30',
        chair: 2,
        type: 'cleaning',
        status: 'scheduled'
      },
      {
        patient: patients[2]._id,
        dentist: users[0]._id,
        appointmentDate: tomorrow,
        startTime: '11:00',
        endTime: '11:30',
        chair: 1,
        type: 'filling',
        status: 'scheduled'
      }
    ]);

    // Create Treatments
    await Treatment.create([
      {
        patient: patients[0]._id,
        dentist: users[0]._id,
        appointment: appointments[0]._id,
        procedure: 'Dental Cleaning',
        diagnosis: 'Routine checkup, minor plaque buildup',
        status: 'completed',
        cost: 1500
      },
      {
        patient: patients[1]._id,
        dentist: users[1]._id,
        procedure: 'Teeth Whitening',
        diagnosis: 'Cosmetic procedure',
        status: 'planned',
        cost: 5000
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('Users created:', users.length);
    console.log('Patients created:', patients.length);
    console.log('Appointments created:', appointments.length);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
