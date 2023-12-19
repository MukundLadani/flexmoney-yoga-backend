const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
var { YogaDB } = require("./server/model/model");

const connectDB = require("./server/Database/connection");

const app = express();
app.use(express.json());

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

// API endpoint to handle form submissions
app.post("/api/enroll", async (req, res) => {
	console.log("Request body", req.body);
	const { name, age, batch } = req.body;

	// Basic validation
	if (!name || !age || !batch) {
		return res
			.status(400)
			.json({ error: "Please provide all required information." });
	}

	// Age validation
	if (age < 18 || age > 65) {
		return res.status(400).json({ error: "Age must be between 18 and 65." });
	}

	// Mock payment processing (replace this with actual payment processing logic)
	const paymentResult = CompletePayment(name, age, batch);
	if (!paymentResult.success) {
		return res.status(500).json({ error: "Payment failed." });
	}

	// Store data in the MongoDB database
	try {
		const user = new YogaDB({
			name: req.body.name,
			age: req.body.age,
			batch: req.body.batch,
		});

		user.save(user);
		// db.collection("users").insertOne({
		console.log("User", user);
		res.json({ success: true, message: "Enrollment successful!" });
	} catch (err) {
		console.error("Error storing data in MongoDB:", err);
		res.status(500).json({ error: "Error storing data in the database." });
	}
});

// Mock function for payment processing
function CompletePayment(name, age, batch) {
	// Replace this with actual payment processing logic
	return { success: true, message: "Payment successful." };
}

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
