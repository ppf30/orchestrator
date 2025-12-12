// routes/acquireRoutes.js
const express = require("express");
const router = express.Router();

const orchestratorController = require("../controllers/orchestratorController");

// Contrato del servicio ACQUIRE
router.get("/health", orchestratorController.health);
router.post("/run", orchestratorController.run);

module.exports = router;