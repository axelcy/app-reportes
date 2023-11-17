Primeros pasos
Repositorio: https://github.com/axelcy/reportes-ort

El frontend está en la carpeta raíz, el backend en /api. Los 2 se corren de la misma manera:
Para instalar las dependencias: npm i
Para correr el proyecto: npm run start
Para correr el proyecto en modo watch: npm run dev

Para ejecutar la base de datos que se encuentra en /api/db:
Crear una base de datos con el nombre “app-reportes”
Ejecutar el archivo “1. CreateLoginAndUser”
Ejecutar el archivo ”2. script”
Nota: usar MS sql server, y en el caso de que el script 2 tire error, eliminar las líneas en las que esté el error

Backend
Models
ruta:/api/src/models

Los models son las estructuras (clases) de los nuestros de datos. Ej: Incidente, Edificio, etc.
Services
ruta:/api/src/services

Los services son los archivos que se conectan directamente con la base de datos

Controllers
ruta:/api/src/controllers

Los controles usan los servicios, y a partir de ellos devuelven la información necesaria
Routes
ruta:/api/src/routes

Las routes conectan un controller con un endpoint. Por ejemplo, hace que al entrar a /usuarios aparezca la información que devuelve una función del controlador de usuarios.


Frontend
Componentes
ruta:/src/Components

En esta carpeta se encuentran los distintos componentes que conforman la aplicación al igual que sus estilos
Context
ruta:/src/services

En esta carpeta se encuentran las variables globales, las cuales se pueden usar en distintos archivos

Hooks
ruta:/src/Hooks

En esta carpeta se encuentran nuestros custom hooks, son funciones creadas por nosotros con el objetivo de no repetir código.

Pages
ruta:/src/pages

En esta carpeta se encuentran las páginas de nuestra aplicación al igual que sus estilos



