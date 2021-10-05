const { Permissions } = require('discord.js');
exports.run = async (client, message, args, xpdb) => {//-> eventos instanciados
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply('```diff\n- Você não tem permissão para utilizar esté comando.```')//-> verifica se o usuário tem permissão
    const canal = message.mentions.channels.first()//-> faz a coleta do nome do canal que deseja manda
    if(!canal) return message.reply("Você deve inserir qual canal deseja enviar está mensagem. Obs: você precisa inserir neste formato **#onomedocanal**")//-> Mensagem de erro caso o usuário não indicou nenhum canal
    const razao = message.content.split(' ').slice(2).join(' ')//-> Será coletado a mensagem que o usuário deseja enviar
    if(!razao) return message.reply("Você precisa escrever algo que deseja anunciar.")//-> Mensagem de erro caso o usuário não escreve nenhuma mensagem
    message.reply(`Sua mensagem foi enviada com **Sucesso** para o canal ${canal}`)//-> Mensagem de aviso que foi concluido
    .then(msg => {
      message.delete({ timeout: 500 })//Evento no qual depois de 500 milisegundos apagara mensagem (comando) 
    })
    canal.send(`${razao}`)//-> Enviando mensagem
}