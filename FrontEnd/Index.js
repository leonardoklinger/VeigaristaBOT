//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Imports =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
require("dotenv").config()
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Arquivos instanciados =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const xpdb = require("./DataBase/xpdb.js")
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Evento de ligação do bot -=-=-=-=-=-=-=-=-=-=-=-=-=-=-
client.once("ready", () => {
        console.log(`Bot ${client.user.tag} está ligado !`)
})
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Eventos|Comandos =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
client.on("messageCreate", message => {
        const xpLevel = require("./Eventos/xp.js")
        xpLevel.run(client, message, xpdb)
})

client.on("messageCreate", message => {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;
        if (!message.content.toLowerCase().startsWith(process.env.PREFIX)) return;//-> aceita qualquer formato maiúsuclo ou minúsculo e seta o prefix que está em nossa config.JSON
        if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;//-> pega a mensagem do usuário
        const args = message.content.trim().slice(process.env.PREFIX.length).split(/ +/g);
        const command = args.shift().toLowerCase();
        try {
                const commandFile = require(`./Comandos/${command}.js`)//Na onde nossos comandos vão ficar
                commandFile.run(client, message, args, xpdb);//Eventos no qual será carregado junto com o comando
        } catch (err) {
                return message.channel.send(`**Infelizmente o comando __${command}__ não existe !**`)//Mensagem de erro
        }
})
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

client.login(process.env.TOKEN_DISCORD)//Onde faz a ligação do bot