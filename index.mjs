import express from "express";
import cors from "cors";
import "express-async-errors";
import product from "./routes/product.mjs";
import 'dotenv/config';

const PORT = process.env.PORT || 5050;
const app = express();
console.log(process.env.PORT);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({message: "Welcome to the Online marketplace Application."})
});

app.use("/api/", product);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
