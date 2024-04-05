const express = require ('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const cors = require ('cors');
const rutasExportaciones = require("./rutas/exportaciones");

// inicio express y la respuesta la guardo en la constante app
const app=  express();

const puerto= process.env.PORT || 9000 ;

//middleware
app.use(cors());
app.use(express.json());
app.use('/api', rutasExportaciones);


//mis rutas


// conexion a mongoDB
mongoose.connect(
    process.env.MONGODB_CENEXION
)


// usamos el aobjeto creado llamado app
app.listen(puerto, () => console.log('servidor escuchando por el puerto: ', puerto));

