<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Levantar las base de datos con docker-compose
```
docker-compose up -d
```
2. Configurar las variables de entorno en el archivo .env.template y renombrar a .env
3. Ejecutar SEED
```
http://localhost:3000/api/seed
```
4. Levantar el proyecto
```
npm start:dev
yarn start:dev
```
