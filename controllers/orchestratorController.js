// orchestrator/controllers/orchestratorController.js

// URLs base según los contratos de servicio
const ACQUIRE_BASE_URL = 'http://acquire:3001';
const PREDICT_BASE_URL = 'http://predict:3002';
const ORCHESTRATOR_SERVICE_NAME = "orchestrator";

// Función auxiliar para manejar respuestas de fetch y parsear JSON
async function handleFetchResponse(response, serviceName) {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: response.statusText };
        }

        const error = new Error(`Error ${response.status} from ${serviceName}`);
        error.status = response.status;
        error.details = errorData;
        throw error;
    }

    return response.json();
}

// --- GET /health ---
function health(req, res) {
    res.status(200).json({
        status: "ok",
        service: ORCHESTRATOR_SERVICE_NAME
    });
}

// --- POST /run ---
async function run(req, res) {
    let dataId = null;

    try {
        // 1. LLAMADA A ACQUIRE (POST /data)
        const acquireFetch = await fetch(`${ACQUIRE_BASE_URL}/data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        const acquireData = await handleFetchResponse(acquireFetch, "Acquire");

        const { features } = acquireData;
        dataId = acquireData.dataId;

        // Validación de datos esenciales
        if (!dataId || !features || features.length !== 7) {
            throw new Error("Respuesta de Acquire inválida (dataId o vector de 7 features faltante).");
        }

        // 2. LLAMADA A PREDICT (POST /predict)
        const predictPayload = {
            features: features,
            meta: {
                featureCount: features.length,
                dataId: dataId,
                source: ORCHESTRATOR_SERVICE_NAME,
            }
        };

        const predictFetch = await fetch(`${PREDICT_BASE_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(predictPayload),
        });

        const predictData = await handleFetchResponse(predictFetch, "Predict");

        const { predictionId, prediction, timestamp } = predictData;

        // 3. RESPUESTA AL FRONTEND
        return res.status(200).json({
            dataId: dataId,
            predictionId: predictionId,
            prediction: prediction,
            timestamp: timestamp
        });

    } catch (error) {
        // ERRORES DE SERVICIOS DOWNSTREAM
        if (error.status) {
            return res.status(502).json({
                error: "Bad Gateway",
                message: `Error received from downstream service (Acquire or Predict). Status: ${error.status}`,
                details: error.details || error.message
            });
        }

        // ERRORES INTERNOS DEL ORQUESTADOR
        console.error("Error inesperado en /run:", error);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Unexpected error in orchestrator.",
            detail: error.message
        });
    }
}

module.exports = {
    health,
    run
};
