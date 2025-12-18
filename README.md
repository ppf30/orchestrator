# ORCHESTRATOR

Descripción breve y clara de qué hace este proyecto.


## Uso

NOTA: todo el proyecto está dockerizado, pero se puede probar en local

```bash
# Iniciar el orquestador
node server.js
```

## Pruebas en Postman
GET http://localhost:8080/health

POST http://localhost:8080/run



## Lenguaje 

* Todo el código está en Java Scrip

## Estructura del Proyecto

```
orchestrator/
│── controllers/
│──│── orchestratorControllers.js
│── node_modules/
│── routes/
│──│── orchestratorRoutes.js
│── dockerfile
│── package-lock.json
│── package.json
│──server.js
│── README.md

```


## Licencia

Este proyecto está bajo la licencia MIT.
