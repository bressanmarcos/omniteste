const mongoose = require('mongoose');

// Cria no banco de dados os ''Models'' relacionados a cada tipo de dado

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
}, {
        timestamps: true
    });

module.exports = mongoose.model("Box", Box);