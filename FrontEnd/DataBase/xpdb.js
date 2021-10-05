var mongoose = require("mongoose")
var Schema = mongoose.Schema
require("dotenv").config()
mongoose.connect(`${process.env.TOKEN_MONGODB}`, { // Onde pegamos o link, da conexão em Cluster
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    console.log('\x1b[32m[ BANCO DE DADOS ] \x1b[0mBanco de dados foi ligado "XP"');
}).catch(function () {
    console.log('\x1b[31m[ BANCO DE DADOS ] \x1b[0mBanco de dados desligado por erro "XP"');
});

var XP = new Schema({
    _id: { type: String, default: 0 },//-> Estou usando tipo string por causa que o id do discord é grande, e os bytes do "number" é limitado, claro eu poderia utilizar um Long ou Double, mas, não consegui fazer essas implementações.
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    coins: { type: String, default: 0 },//-> Mesma situação do id
    perfil: { type: Number, default: 0 },
    perfiledit: { type: Number, default: 0 },
    warn: { type: Number, default: 0 },
    nickLol: { type: String, default: 0 },
})

var XPs = mongoose.model("XP", XP);
exports.XPs = XPs
