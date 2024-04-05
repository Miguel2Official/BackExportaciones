const express = require('express');
const esquema_de_exportaciones = require('./esquema/esquema_exportacion');

// Constructor de rutas
const rutas = express.Router();

// Crear una exportación
rutas.post('/exportacion', (peticion, respuesta) => {
  const exportacion = new esquema_de_exportaciones(peticion.body);
  exportacion.save()
    .then((datos) => respuesta.json(datos))
    .catch((error) => respuesta.status(400).json({ message: error.message }));
});

// Obtener todas las exportaciones
rutas.get('/exportacion', (peticion, respuesta) => {
  esquema_de_exportaciones.find()
    .then((datos) => respuesta.json(datos))
    .catch((error) => respuesta.status(400).json({ message: error.message }));
});

// Obtener una exportación por su ID
rutas.get('/exportacion/:id', (peticion, respuesta) => {
  const { id } = peticion.params;
  esquema_de_exportaciones.findById(id)
    .then((datos) => respuesta.json(datos))
    .catch((error) => respuesta.status(400).json({ message: error.message }));
});

// Actualizar una exportación
rutas.put('/exportacion/:id', (peticion, respuesta) => {
  const { id } = peticion.params;
  const { Producto, Cantidad, ValorKilo, ValorTotal } = peticion.body;

  const datosActualizados = {
    Producto,
    Cantidad,
    ValorKilo,
    ValorTotal // Incluir el nuevo campo 'ValorTotal' en los datos actualizados
  };

  console.log('Datos actualizados:', datosActualizados); // Verificar los datos recibidos desde el cliente

  esquema_de_exportaciones.findByIdAndUpdate(id, datosActualizados, { new: true })
    .then((updatedExportacion) => {
      console.log('Exportación actualizada:', updatedExportacion); // Verificar la exportación actualizada
      respuesta.json(updatedExportacion);
    })
    .catch((error) => {
      console.error('Error al actualizar la exportación:', error.message); // Imprimir cualquier error que ocurra
      respuesta.status(400).json({ message: error.message });
    });
});


// Eliminar una exportación
rutas.delete('/exportacion/:id', (peticion, respuesta) => {
  const { id } = peticion.params;
  esquema_de_exportaciones.findByIdAndDelete(id)
    .then(() => respuesta.json({ message: 'Exportación eliminada correctamente' }))
    .catch((error) => respuesta.status(400).json({ message: error.message }));
});

module.exports = rutas;
