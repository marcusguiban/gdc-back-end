const Appointment = require("../models/Appointment");

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
};

const getAppointment = async (req, res) => {
  const id = req.params.id;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve appointment" });
  }
};

const createAppointment = async (req, res) => {
  const { patientName, PatientID, PatientEmail, PatientContactNumber, dentistName, dentistID, branch, time,day } = req.body;

  try {
    const appointment = await Appointment.create({
      patientName: patientName,
      PatientID: PatientID,
      PatientEmail: PatientEmail,
      PatientContactNumber: PatientContactNumber,
      dentistName: dentistName,
      dentistID: dentistID,
      branch: branch,
      day:day,
      time: time,
    });

    if (appointment) {
      res.status(201).json({ msg: `Appointment created with id ${appointment._id}` });
    } else {
      res.status(400).json({ msg: "Appointment not created" });
    }
  } catch (error) {
    throw error;
}
};

const updateAppointment = async (req, res) => {
  const { patientName, PatientID, PatientContactNumber, PatientEmail, dentistName, dentistID, branch, time, id } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(id, {
      patientName: patientName,
      PatientID: PatientID,
      PatientEmail: PatientEmail,
      PatientContactNumber: PatientContactNumber,
      dentistName: dentistName,
      dentistID: dentistID,
      branch: branch,
      time: time,
    });

    if (appointment) {
      res.status(200).json({ msg: `Appointment updated with id ${appointment._id}` });
    } else {
      res.status(400).json({ msg: "Appointment not updated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.body;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (appointment) {
      res.status(200).json({ msg: `Appointment deleted with id ${id}` });
    } else {
      res.status(400).json({ msg: "Appointment not deleted" });
    }
  } catch (error) {
    throw error;
}
};

module.exports = {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
