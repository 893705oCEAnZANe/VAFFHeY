// 代码生成时间: 2025-10-21 08:30:51
const express = require('express');

const app = express();

const port = 3000;

const { check, validationResult } = require('express-validator');


// Middleware to parse JSON bodies

app.use(express.json());



/**

 * Define a route to handle registration of new doctors.
 *
 * @param {string} req.body.name - The name of the doctor.
 * @param {string} req.body.specialization - The specialization of the doctor.
 * @param {string} req.body.licenseNumber - The license number of the doctor.
 *
 * @returns {object} The registered doctor's information.
 */

app.post("/registerDoctor", [
	check("name").notEmpty().withMessage("Name is required"),
	check("specialization").notEmpty().withMessage("Specialization is required"),
	check("licenseNumber").notEmpty().withMessage("License number is required")
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	// Simulate database registration
	const doctor = {
		...req.body
	};
	
	// Respond with the registered doctor's information
	res.status(201).json(doctor);
});



/**
 * Define a route to handle patient consultation requests.
 *
 * @param {string} req.body.patientName - The name of the patient.
 * @param {string} req.body.doctorName - The name of the doctor.
 * @param {string} req.body.issue - The medical issue described by the patient.
 *
 * @returns {object} The consultation request status.
 */

app.post("/requestConsultation", [
	check("patientName").notEmpty().withMessage("Patient name is required"),
	check("doctorName").notEmpty().withMessage("Doctor name is required\),
	check("issue").notEmpty().withMessage("Issue is required\)
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	// Simulate database registration
	const consultationRequest = {
		...req.body
	};
	
	// Respond with the consultation request status
	res.status(201).json({
		status: "Consultation request received",
		consultationRequest
	});
});



// Start the server
app.listen(port, () => {
    console.log(`Remote Medical Platform is running on http://localhost:${port}`);
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
