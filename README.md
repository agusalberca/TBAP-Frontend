# TBAP Backend
## _Transforma tus logros en insignias digitales respaldadas por Blockchain._

Este sistema proporciona un marco para el manejo y adquisicion de insiginias digitales con sus respectivas validaciones y tipos de usuarios.
Es la sección practica que forma parte de toda una tesina que involucra mucho mas que un frontend. 
[link de la tesina]


## Instalación

El sistema se encuentra dockerizado, por ende es recomendable tener la [aplicación](https://www.docker.com/) instalada.

Sobre el root del proyecto ejecuctar:

```sh
docker compose up --build
```

Esto instalará todas las dependecias del proyecto y encenderá el frontend en el la url 0.0.0.0:3000 del host local. 
El sistema cuenta 2 con estructuras principales, la primera una landing estatica que fue pensada recibir a los usuarios y contarles del sistema, mientras que la segunda es una aplicacion react que contiene el sistema real contectado al backend.
Es importante notar que el sistema posee certificados SSL locales para la demostracion de inicio de sesion con agentes externos, pero es solo con fines de prueba.


## Creadores
- [Juan Ignacio Borrelli](https://www.linkedin.com/in/juan-ignacio-borrelli/)
- [Alberca Agustin](https://www.linkedin.com/in/agust%C3%ADn-alberca-862444221/)

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)
