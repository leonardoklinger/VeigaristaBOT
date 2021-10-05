exports.run = async (client, message, xpdb) => {
    if (message.author.bot) return;//-> bot não será cadastro no banco de dados
    if (message.channel.type == 'dm') return;//-> comando em seu privado não funciona
    let addPontos = Math.floor(Math.random() * 7) + 8;//-> calculo matemático para a soma dos pontos
    let addCoins = Math.floor(Math.random() * 500 + 1)//->Gerá o coins do user
    xpdb.XPs.findOne({ "_id": message.author.id }, async function (erro, documento) {//-> busca o usuário no bando de dados
        if (documento) {
            documento.xp += addPontos;//-> soma os pontos
            if (documento.xp > documento.level * 500) {//-> verifica se o XP do usuário é maior que 500 caso seja adiciona 1 level a +
                documento.level += 1
                documento.coins = (parseFloat(documento.coins) + addCoins)
                documento.coins 
                message.reply(`Parabéns, você acabou de subir para o level **${documento.level}** 🆙 e ganhou $**${addCoins}** 🪙 VeigarCoins de recompensa !`)
            }
            documento.save()//-> salva as alterações
        } else { // Caso o Usuário não tenha ainda um documento salvo na Database
            new xpdb.XPs({ _id: message.author.id, }).save();//-> exceção caso não tenha cadastro do usuário no banco de dados
        }
    })

}