const { Int32, Double } = require('mongodb');
const mongoose = require('mongoose');

const esquema_de_exportaciones= mongoose.Schema({
    Producto: {
        type: String,
        required: true
    },
    Cantidad: {
        type: Number,
        required: true
    },
    ValorKilo:{
        type: Number,
        required: true
    },
    ValorTotal:{
        type: Number
    }
});

module.exports = mongoose.model('exportaciones', esquema_de_exportaciones);