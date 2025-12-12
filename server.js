// orchestrator/server.js

const express = require('express');
const orchestratorRoutes = require('./routes/orchestratorRoutes');

const app = express();
[cite_start]// Puerto base según el contrato [cite: 10]
const PORT = 8080; 

// Middleware
app.use(express.json()); 

// Rutas
app.use('/', orchestratorRoutes); 

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Orchestrator service running on port ${PORT}`);
});