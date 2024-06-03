<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Instalar dependencias
2. Crear archivo .env en la raiz del proyecto
3. Ejecutar el comando
```
npm run start:dev
```
4. Instalar Nest Cli instalador global
```
npm i -g @nestjs/cli
```
5. Levantar la base de datos
```
docker-compose up -d
```
6. Realizar una peticion GET al SEED para poblar la base de datos
```
http://localhost:3000/seed
```

## Stack usados
* MongoDB
* NestJS