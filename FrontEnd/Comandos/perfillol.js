exports.run = async (client, message, args, xpdb) => {
    const { MessageEmbed } = require('discord.js');
    const axios = require("axios");
    const elojson = require('../Eventos/LeagueOfLegends/elo/elo.json')
    const nickName = message.content.split(' ').slice(1).join(' ')
    require('dotenv').config()


    if (nickName == "") return message.reply(`Por favor, informe um nick !`)
    const perfilBackEnd = await axios.get(`${process.env.LINK_BACKEND}/:${encodeURI(nickName)}`)
        .catch((e) => {
            if (e.response == undefined) return message.reply(`Infelizmente nossos serviços está Offline <:offline:889638393200390215>, volte mais tarde.`)
            if (e.response.status === 404) return message.reply(`Infelizmente o usuário ${nickName} não existe ❌`)
        });

    if (perfilBackEnd.data == undefined) return
    const { iconUrl, summonerLevel, name, tier, queueType, rank, lp, wins, losses, winRate, tierFlex, rankFlex, lpFlex, winsFlex, lossesFlex, winRateFlex, queueTypeFlex } = perfilBackEnd.data
    const eloIconSolo = elojson.filter(element => element.name == tier)
    const eloIconFlex = elojson.filter(element => element.name == tierFlex)

    const exampleEmbed = new MessageEmbed()
        .setColor('#36393F')
        .setTitle(`<:lollogo:888167815658500106> Perfil: __${name}__  Nível: __${summonerLevel}__ 🎚️`)
        .setDescription(`Sua alma irá servir a mim ${message.author}`)
        .setThumbnail(`${iconUrl}`)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Rank Solo Duo:', value: `${eloIconSolo[0].elo} **${!tier ? "Sem Elo" : tier} ${!rank ? "".trim() : rank}**\n**Winrate:** ${!winRate ? "0".trim() : winRate}%\n**${!lp ? "**0**".trim() : lp}**LP | **${!wins ? "0".trim() : wins}** Vitórias **${!losses ? "0".trim() : losses}** Derrotas`, inline: true },//calculo para winrate win/win + loses * 100
        )
        .addField('Rank Flex:', `${eloIconFlex[0].elo} **${!tierFlex ? "Sem Elo" : tierFlex} ${!rank ? "".trim() : rank}**\n**Winrate:** ${!winRateFlex ? "0".trim() : winRateFlex}%\n**${!lpFlex ? "0".trim() : lpFlex}**LP | **${!winsFlex ? "0".trim() : winsFlex}** Vitórias **${!lossesFlex ? "0".trim() : lossesFlex}** Derrotas`, true)
        .setImage("https://i.imgur.com/LPMbXSJ.png")

    message.channel.send({ embeds: [exampleEmbed] });
}