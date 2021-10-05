const Discord = require('discord.js');
exports.run = async (client) => {
client.on("ready", ready => {//evento quando o bot liga !
        console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
    })
}