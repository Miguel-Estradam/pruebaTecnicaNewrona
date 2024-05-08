
<!-- Creado por Miguel Muñoz 
    https://www.linkedin.com/in/miguelestradam12
 -->

# Documentación de la Aplicación de Prueba Técnica para New Roma

Bienvenido a la documentación de la aplicación de prueba técnica para New Roma. En esta documentación encontrarás información sobre cómo utilizar la aplicación

## Descripción

La aplicación de prueba técnica para New Roma es una plataforma para el manejo de operarios. La aplicación permite realizar operarios CRUD (Crear, Leer, Actualizar y Eliminar) en una base de datos Firebase, incluye autenticación de usuarios y permite la creación de nuevos usuarios.

## Contenido

1. [Requisitos](#requisitos)
2. [Demo](#demo)
2. [Estructura](#estructura)
3. [Instalación](#instalación)
4. [Deploy](#Deploy)

## Demo y credenciales
 link de demo https://pruebatecnicanewrona-22ae5.web.app/
 Credenciales para ingresar:
    correo: miguelestradam12@gmail.com
    contraseña: 123456

## Requisitos

Para utilizar la aplicación, necesitarás:

- Acceso a Internet.
- Node.js versión 20.12.0 o superior.
- Angular versión 17 o superior.

## Estructura

<!-- prettier-ignore -->
La estructura de este proyecto se basa es una screaming architecture

├── src/                     # Código fuente de la aplicación
│ ├── app/                   # Archivos de la aplicación
│ │ ├── common/              # Componentes y servicios compartidos
│ │ │ ├── serviceMessages.ts # servicios que contiene funciones con popUps usando sweetalert2
│ │ │ └── ...
│ │ ├── Modules/             # módulos o domains los cuales contienen cada sección de nuestra aplicación
│ │ │ ├── auth/              # Modulo auth
│ │ │ │ ├── Components/      # Componentes de auth
│ │ │ │ ├── layouts/         # Estructuras de auth
│ │ │ │ ├── pages/           # paginas o screens de auth (login,restore-password)
│ │ │ │ ├── interfaces/      # Modelo de la interfaz, entre estas se encuentra la interfaz para login de usuario userLogin
│ │ │ │ ├── services/        # servicios de auth, auth.services.ts
│ │ │ │ └── ...
│ │ │ ├── dashboard/         # Modulo dashboard
│ │ │ │ ├── Components/      # Componentes de dashboard
│ │ │ │ ├── layouts/         # Estructuras de dashboard
│ │ │ │ ├── pages/           # paginas o screens de dashboard (users, workers)
│ │ │ │ ├── interfaces/      # Modelo de la interfaz, (users,workers.)
│ │ │ │ ├── services/        # servicios de auth, auth.services.ts
│ │ │ │ └── ...
│ │ ├── utils/               # Módulos de funcionalidades específicas
│ │ │ ├── routes.ts          # Rutas children
│ │ │ └── ...
│ │ ├── app.component.ts     # Componente raíz de la aplicación
│ │ ├── app.config.ts        # Módulo raíz de la aplicación y conexión de firebase
│ │ ├── app.routes.ts        # Rutas raíz de la aplicación
│ │ ├── firebase.config.ts   # Configuración de firebase
│ │ └── ...
│ ├── assets/                # Archivos estáticos (imágenes, fuentes, etc.)
│ ├── environments/          # Configuraciones de entornos (dev, prod, etc.)
│ ├── styles/                # Estilos globales (CSS, SCSS, etc.)
│ ├── index.html             # Archivo HTML raíz
│ └── ...
│
├── .angular.json             # Configuración de Angular CLI
├── firebase.json             # Configuración de firebase hosting
├── package.json              # Lista de dependencias y comandos de scripts
├── tsconfig.json             # Configuración de TypeScript
├── tailwind.config.js        # Configuración de Tailwinds
├── tslint.json               # Configuración de TSLint (linter para TypeScript)
└── ...

## Instalación

Una ves tenemos nuestros archivos descomprimidos, dentro de esta carpeta corremos el comando 
    npm install     # para instalar todas la librerías necesarias

En unos casos no cargan los estilos de tailwindcss asi que lo instalamos por separado con el comando
    npm install -D tailwindcss

Configuramos nuestras variables de entorno par conectarlo a nuestro servicio de firebase (si desea cambiarlas)
- nos dirigimos a la carpeta src/enviroments y agregamos los datos respectivos de firebase 
    firebase: {
      projectId: '',
      appId: '',
      storageBucket: '',
      apiKey: '',
      authDomain: '',
      messagingSenderId: '',
      measurementId: '',
    },
  
  Si cambiaste las variables de entorno de firebase debes hacer el siguiente proceso par crear un usuario (si no las cambiaste puedes usar el usuario del demo)
    1. ir al archivo src/app/aoo.routes.ts  
    2. encontrar la siguiente linea de codigo y comentarla ...canActivate(() => redirectUnauthorizedTo(['/login'])),  esta linea es una guard que nos da firebase que verifica que estemos autentificados.
    3. usamos el comando npm start o ng servo -o y nos dirigimos a la siguiente ruta http://localhost:4200/dashboard/users si se esta ejecutando en el puerto 4200
    4. dentro de esta pagina podemos encontrar un boto que dice crear usuario, le damos click llenamos el formulario y listo.
    5. volvemos a archivo src/app/aoo.routes.ts 
    6. descomentamos la liena  ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  
  y listo la aplicación ya esta funcionando correctamente


