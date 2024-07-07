# Supercars


##  Configuración del Proyecto
- Inicializar un nuevo proyecto Angular utilizando la CLI.
- Organizar la estructura de carpetas de manera lógica y escalable, agrupando por funcionalidad.

##  Autenticación de Usuarios
- Implementar páginas de registro y login.
- Crear servicios de autenticación para comunicarse con las rutas /users del backend.
- Almacenar la sesión del usuario en las cookies para mantener la sesión activa.

##  Visualización y Reserva de Vehículos
- Permitir a todos los visitantes visualizar todos los vehículos disponibles en una página pública.
- Redirigir a los usuarios no autenticados a la página de login al intentar realizar una reserva.
- Completar el proceso de reserva para los usuarios autenticados.

##  Gestión de Vehículos y Reservas por Administradores
- Crear un apartado de administración accesible solo por usuarios con rol de administrador.
- Permitir a los administradores añadir, borrar, y actualizar vehículos, gestionar todas las reservas y usuarios.

##  Apartado Privado para Usuarios
- Crear un área privada donde los usuarios puedan ver sus propias reservas.
- Implementar funciones para que los usuarios puedan cancelar o modificar sus reservas.

##  Rutas y Navegación
- Configurar el enrutamiento de la aplicación para incluir rutas protegidas y rutas hijas.
- Implementar guardas de ruta para asegurar que solo los usuarios autenticados puedan realizar reservas y acceder a su apartado privado.
- Implementar guardas de ruta para que solo los administradores puedan acceder al apartado de administración.

## Interfaces TypeScript
Definir interfaces TypeScript.
