exports.run = async (client, message, args) => {
  const { MessageEmbed } = require('discord.js');
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply('```diff\n- Você não tem permissão para utilizar esté comando.```')//-> verifica se o usuário tem permissão
  const sla = message.content.split(' ').slice(1);//-> Bot coleta o número de mensagem que será excluida !
  const amount = sla.join(' ');//-> aqui pega só o valor

  if (!amount) return message.reply('Digite a quantidade de mensagens que serão excluídas');//-> Mensagem de erro caso o usuário não informa nenhum valor
  if (isNaN(amount)) return message.reply('Informe apenas números !');//-> verifica se realmente o valor é considerado um número

  if (amount > 100) return message.reply('Você não pode excluir uma quantidade maior que 100 mensagens!');//-> Mensagem de erro caso o usuário passe do valor 100
  if (amount < 1) return message.reply('Você precisa excluir pelo menos 1 mensagem');//-> Mensagem de erro caso o usuário digite um valor menor que 1

  await message.channel.messages.fetch({ limit: amount }).then(messages => {
    message.channel.bulkDelete(messages)//-> evento no qual será apagado a mensagem !
    const clearchat1 = new MessageEmbed()//-> Mensagem embed
      .setColor('#92d546')//-> Seta uma cor (pode ser em hexadecimal)
      .setTitle('🚚👷Caminhão do lixo👷🚚')//-> Titulo
      .addField("**Chat foi limpo por: **", `${message.author.username}`)//-> Mensagem em formato de Field
      .addField(`**Limpei com sucesso**`, `__${messages.size}__ **mensagens** do canal ${message.channel}`)//-> Mensagem em formato de Field
      .setImage("https://i.imgur.com/HFKBJvh.gif")//-> Seta uma imagem
      .setTimestamp()//-> Seta um horario
    message.channel.send({ embeds: [clearchat1] })//-> Envia a mensagem
  })
}