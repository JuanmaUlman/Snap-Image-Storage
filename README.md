# Proyecto Snap Image Storage

## Ulman Juan Manuel

"El proyecto Snap Image Storage es un componente de React diseñado para simplificar la selección y el almacenamiento de imágenes en la nube. Cuando seleccionas una o varias imágenes, estas se muestran en forma de tarjetas que incluyen información como el nombre, el tipo y el tamaño.Junto a este proceso, el componente realiza automáticamente la compresión y redimensionamiento de las imágenes. Esto asegura que las imágenes no sean tan pesadas al usarlas, optimizando su rendimiento en tu aplicación. Además, tienes la capacidad de asignar etiquetas a estas imágenes, lo que te permite categorizarlas. Por ejemplo, si gestionas una tienda de ropa y cargas imágenes de camisetas, puedes asignarles la etiqueta "Camiseta". Luego, al guardarlas en la nube y acceder a la base de datos, podrás seleccionar y recuperar fácilmente las imágenes según la categoría deseada. Simplemente haciendo clic en el botón "Subir", las imágenes se almacenan de manera segura en Firebase Storage."

El proyecto fue creado con Vite, una herramienta que ofrece características y eficiencia para el desarrollo de aplicaciones web en React. [Vite](https://github.com/vitejs/vite).

Como información adicional, este proyecto utiliza variables de entorno para garantizar la seguridad y privacidad de los datos almacenados en la base de datos de Firebase. Estas variables de entorno se utilizan para cifrar y proteger el contenido de la base de datos, asegurando que los datos sean accesibles solo para usuarios autorizados.

## Para levantar el proyecto, utilizar el siguiente comando en la consola:

### `npm run dev`

La App abre en el puerto [ http://localhost:5173/](http://localhost:5173/) del navegador.

## Las dependencias que se utilizaron en el proyecto son:

- [ ] bootstrap
- [ ] compressorjs
- [ ] sharp
- [ ] sweetalert2
- [ ] firebase
- [ ] react
- [ ] react-bootstrap
- [ ] dotenv

## Gif de un proceso de selección y subida de una o varias imagenes.

<p>
<img src="./src/assets/SnapImageStorage.gif" alt="SnapImageStorage">
</p>
