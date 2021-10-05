exports.run = async (client, message, args, xpdb) => {
    const { MessageEmbed } = require('discord.js');
	if (!message.mentions.users.size) {//-> Caso não mencionar ninguém será carregado o avatar do autor do comando
        const avatar = new MessageEmbed()//-> Mensagem embed
            .setImage(`${message.author.displayAvatarURL({ format: "png"})}`)//-> Seta o avatar do usuário em formato png
            return message.channel.send({embeds: [avatar]})//-> Envia o avatar
    }

	const avatarList = message.mentions.users.map(user => {//-> Evento no qual pega o nome do usuário para carregar um avatar
        const avataruser = new MessageEmbed()//-> Mensagem embed
        .setImage(`${user.displayAvatarURL({ format: "png", dynamic: true })}`)//-> Seta o avatar do usuário em formato png
        return message.channel.send({embeds: [avataruser]});//-> Envia o avatar
    })
}