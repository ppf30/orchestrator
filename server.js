// orchestrator/server.js
require("dotenv").config();
const express = require("express");
const app = express();
const orchestratorController = require("./controllers/orchestratorController");

const PORT = process.env.PORT || 8080;

app.use(express.json());

// Endpoints según el contrato de ORCHESTRATOR
app.get("/health", orchestratorController.health);
app.post("/run", orchestratorController.run);


app.listen(PORT, () => {
  console.log(`ORCHESTRATOR escuchando en http://localhost:${PORT}`);
});
