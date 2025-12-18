# ORCHESTRATOR

Hace el papel de un "director de orquesta" para enlazar predict  y acquire, distribuyendo los datos que obtiene de acquire y pasándoselos al predict.

## Repositorios del proyecto
```bash 
https://github.com/ppf30/acquire.git
```
```bash
https://github.com/ppf30/orchestrator.git
```
```bash
https://github.com/ppf30/predict.git
```


## Uso Local

```bash
# Iniciar el orquestador
node server.js
```

## Uso docker
Todo el proyecto está dockerizado, por lo tanto si queremos probarlo con contenedores debemos clonar los repositorios y con el ```docker-compose.yml``` en la carpeta, ejecutamos los siguientes comandos en la terminal:
```bash
docker-compose up -d --build
```

Al finalizar podemos eliminar los contenedores:
```bash
docker-compose down
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
