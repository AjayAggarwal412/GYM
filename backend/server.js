const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const clients = require("../frontend/src/data");

const app = express();
dotenv.config();

app.use(cors({ origin: true, credentials: true }));

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// app.get("/api/myclients", (req, res) => {
//   res.json(clients);
// });

app.use("/api/gym", userRoutes);
app.use("/api/newClients", clientRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log("server listening on port 5000"));
