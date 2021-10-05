exports.run = async (req, res, summonerName, axios, json) => {
    try {
        try {
            const { summonerName } = req.params;
            const version = (await axios.get('http://ddragon.leagueoflegends.com/api/versions.json')).data[0]
            const summonerIdResponse = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName).replace(":", "")}?api_key=${process.env.LOL_KEY}`)
                .catch((e) => {
                    return res.status(e.response.status).json(e.response.data);
                });

            const responseRanked = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerIdResponse.data.id}?api_key=${process.env.LOL_KEY}`)
                .catch((e) => {
                    return res.status(e.response.status).json(e.response.data);
                });
            const soloQ = responseRanked.data.filter(queue => queue.queueType === "RANKED_SOLO_5x5")[0]
            const flexQ = responseRanked.data.filter(queue => queue.queueType === "RANKED_FLEX_SR")[0]
            const array = {}
            if (!soloQ && !flexQ) {
                array[0] = {
                    "iconUrl": `${process.env.LOL_ICONS}/${version}/img/profileicon/${summonerIdResponse.data.profileIconId}.png`,
                    "name": summonerIdResponse.data.name,
                    "summonerLevel": summonerIdResponse.data.summonerLevel,
                    "tier": "VAZIO",
                    "rank": "VAZIO",
                    "wins": "VAZIO",
                    "losses": "VAZIO",
                    "queueType": "VAZIO",
                    "winRate": "VAZIO",
                    "lp": "VAZIO",
                    "tierFlex": "VAZIO",
                    "rankFlex": "VAZIO",
                    "winsFlex": "VAZIO",
                    "lossesFlex": "VAZIO",
                    "queueTypeFlex": "VAZIO",
                    "winRateFlex": "VAZIO",
                    "lpFlex": "VAZIO"

                }
            } else if (soloQ && flexQ) {
                array[0] = {
                    "iconUrl": `${process.env.LOL_ICONS}/${version}/img/profileicon/${summonerIdResponse.data.profileIconId}.png`,
                    "name": summonerIdResponse.data.name,
                    "summonerLevel": summonerIdResponse.data.summonerLevel,
                    "tier": soloQ.tier,
                    "rank": soloQ.rank,
                    "wins": soloQ.wins,
                    "losses": soloQ.losses,
                    "queueType": soloQ.queueType,
                    "winRate": ((soloQ.wins / (soloQ.wins + soloQ.losses)) * 100).toFixed(1),
                    "lp": soloQ.leaguePoints,

                    "tierFlex": flexQ.tier,
                    "rankFlex": flexQ.rank,
                    "winsFlex": flexQ.wins,
                    "lossesFlex": flexQ.losses,
                    "queueTypeFlex": flexQ.queueType,
                    "winRateFlex": ((flexQ.wins / (flexQ.wins + flexQ.losses)) * 100).toFixed(1),
                    "lpFlex": flexQ.leaguePoints
                }
            } else if (!soloQ) {
                array[0] = {
                    "iconUrl": `${process.env.LOL_ICONS}/${version}/img/profileicon/${summonerIdResponse.data.profileIconId}.png`,
                    "name": summonerIdResponse.data.name,
                    "summonerLevel": summonerIdResponse.data.summonerLevel,
                    "tier": "VAZIO",
                    "rank": "VAZIO",
                    "wins": "VAZIO",
                    "losses": "VAZIO",
                    "queueType": "VAZIO",
                    "winRate": "VAZIO",

                    "tierFlex": flexQ.tier,
                    "rankFlex": flexQ.rank,
                    "winsFlex": flexQ.wins,
                    "lossesFlex": flexQ.losses,
                    "queueTypeFlex": flexQ.queueType,
                    "winRateFlex": ((flexQ.wins / (flexQ.wins + flexQ.losses)) * 100).toFixed(1),
                    "lpFlex": flexQ.leaguePoints
                }
            } else if (!flexQ) {
                array[0] = {
                    "iconUrl": `${process.env.LOL_ICONS}/${version}/img/profileicon/${summonerIdResponse.data.profileIconId}.png`,
                    "name": summonerIdResponse.data.name,
                    "summonerLevel": summonerIdResponse.data.summonerLevel,
                    "tier": soloQ.tier,
                    "rank": soloQ.rank,
                    "wins": soloQ.wins,
                    "losses": soloQ.losses,
                    "queueType": soloQ.queueType,
                    "winRate": ((soloQ.wins / (soloQ.wins + soloQ.losses)) * 100).toFixed(1),
                    "lp": soloQ.leaguePoints,

                    "tierFlex": "VAZIO",
                    "rankFlex": "VAZIO",
                    "winsFlex": "VAZIO",
                    "lossesFlex": "VAZIO",
                    "queueTypeFlex": "VAZIO",
                    "winRateFlex": "VAZIO",
                }
            }
            res.json(array[0])
        } catch (error) {
        }
    } catch (e) {
    }
}