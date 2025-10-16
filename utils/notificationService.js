const twilio = require('twilio');
const nodemailer = require('nodemailer');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send WhatsApp reminder
exports.sendAppointmentReminder = async (appointment) => {
  try {
    const message = `Hi ${appointment.patient.firstName}, this is a reminder for your dental appointment with Dr. ${appointment.dentist.name} on ${new Date(appointment.appointmentDate).toLocaleDateString()} at ${appointment.startTime}. See you at Dr. Praharsh's Family Dental Clinic!`;

    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:+91${appointment.patient.phone}`,
      body: message
    });

    console.log('WhatsApp reminder sent successfully');
  } catch (error) {
    console.error('Error sending WhatsApp reminder:', error);
  }
};

// Send email notification
exports.sendEmailNotification = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Send low stock alert
exports.sendLowStockAlert = async (item) => {
  try {
    const subject = `Low Stock Alert: ${item.itemName}`;
    const html = `
      <h2>Low Stock Alert</h2>
      <p>Item: <strong>${item.itemName}</strong></p>
      <p>Current Quantity: <strong>${item.quantity} ${item.unit}</strong></p>
      <p>Reorder Level: <strong>${item.reorderLevel} ${item.unit}</strong></p>
      <p>Please reorder immediately.</p>
    `;

    await exports.sendEmailNotification(
      process.env.ADMIN_EMAIL,
      subject,
      html
    );
  } catch (error) {
    console.error('Error sending low stock alert:', error);
  }
};
