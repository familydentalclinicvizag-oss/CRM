const Appointment = require('../models/Appointment');
const { sendAppointmentReminder } = require('../utils/notificationService');

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const { date, dentist, status } = req.query;
    const query = {};

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.appointmentDate = { $gte: startDate, $lte: endDate };
    }

    if (dentist) query.dentist = dentist;
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName phone')
      .populate('dentist', 'name specialization')
      .sort({ appointmentDate: 1, startTime: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    const populatedAppointment = await appointment.populate([
      { path: 'patient', select: 'firstName lastName phone' },
      { path: 'dentist', select: 'name specialization' }
    ]);

    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: 'patient', select: 'firstName lastName phone' },
      { path: 'dentist', select: 'name specialization' }
    ]);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send appointment reminder
exports.sendReminder = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'firstName lastName phone')
      .populate('dentist', 'name');

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await sendAppointmentReminder(appointment);
    
    appointment.reminderSent = true;
    appointment.reminderSentAt = new Date();
    await appointment.save();

    res.json({ message: 'Reminder sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
