import './suppress-warnings.js';
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let registers = [];

app.post('/api/log', (req, res) => {

	const data = {
		received_on: new Date().toDateString(),
		dados: req.body
	};

	registers.push(data);

	console.log("📥 NOVO REGISTRO RECEBIDO:");
	console.log(data);
	
	res.json({ status: "OK", id: registers.length });
});

app.get("/api/registers", (req, res) => {
	res.json(registers);	
});

app.get("/dashboard", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`🚀 Server running on port: ${PORT}`);
	console.log(`📊 Environment: ${NODE_ENV}`);
	console.log(`🌐 Dashboard: http://localhost:${PORT}/dashboard`);
});
