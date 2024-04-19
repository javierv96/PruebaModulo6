# Prueba - Club deportivo

En esta prueba validaremos nuestros conocimientos de desarrollo de sistemas CRUD y persistencia de datos en archivos JSON. Para lograrlo, necesitarás aplicar tus habilidades en la creación de rutas y endpoints en un servidor, manejo de solicitudes y respuestas HTTP, así como la implementación de operaciones de Crear, Leer, Actualizar y Eliminar utilizando el desafío antes mencionado, utilizando de apoyo el archivo Apoyo prueba - Club Deportivo.

# Descripción

El Club Deportivo Discipline Spa está haciendo negocios con una empresa de software para la construcción de su aplicación para control interno que se conecte con la misma base de datos de su sitio web. Su requerimiento principal es poder registrar, ver, editar y eliminar los deportes que ofrecen en sus sucursales.

Deberás crear un sistema tipo CRUD que persista la información en un archivo JSON correspondiente a los deportes que ofrece este club deportivo.

En este desafío contarás con un Apoyo que contiene un documento HTML preparado para hacer las consultas pertinentes al servidor. De no querer utilizar este apoyo siéntete libre de crear tu propia aplicación cliente.

# Requerimientos
1. Crear  una  ruta  que  reciba  el  nombre  y  precio  de  un  nuevo  deporte,  lo  persista  en  un archivo JSON 
(3  Puntos).  Validar  en  el  backend  que  se  reciben  los  parámetros  necesarios  o  requeridos  y  en  el 
tipo  adecuado,  debe validarse  que  no  se  repitan  los  nombres  de  los  deportes.  
Manejar  esta  ruta con queryStrings. 
 
2. Crear una ruta que al consultarse devuelva en formato JSON todos los deportes registrados (2 Puntos). 
 
3. Crear  una  ruta  que  edite  el  precio  de  un  deporte  registrado,  utilizando  los  parámetros de la 
consulta y persista este cambio (2 Puntos). Recuerde que para modificar se debe consultar, por 
tanto,  hay  que  validar  2  cosas  primero  que  se  reciba  el  parámetro  y  después  que  exista  el 
deporte coincidente con el parámetro. Manejar esta ruta con queryStrings. 
 
4. Crear una ruta que elimine un deporte solicitado desde el cliente y persista este cambio (3 Puntos). En 
el  Backend  Validar  que  se  recibe  el  parámetro  requerido,  también  validar  después  si  existe  el 
deporte solicitado y solo si existe  se podrá eliminar. Manejar esta ruta utilizando parámetros no 
queryStrings, ojo, que esto requiere un pequeño cambio en el Front.

Nota:  Agregar  control  de  ruta  No  Existente,  se  deben  manejar  control  de  errores  con  bloques  try/catch,  y  usar 
variedad de errores y respuestas del servidor según sean necesarias.

# Autores

- [Javier Esteban Vergara Cabrera] (https://github.com/javierv96/PruebaModulo6) - Programador.