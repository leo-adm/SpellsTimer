async function getChampionsData(){
    const url = "http://ddragon.leagueoflegends.com/cdn/10.7.1/data/pt_BR/champion.json"
    var champData;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            champData = data.data;
        })
        .catch(() => {})
    return champData
};

async function getSpellsData(){
    const url = "http://ddragon.leagueoflegends.com/cdn/10.7.1/data/pt_BR/summoner.json"
    var spellData;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            spellData = data.data;
        })
        .catch(() => {})
    return spellData;
};

function getChampImage(champId, championsData){
    let championName;
    for (var i in championsData) {
        if (championsData[i].key == champId) {
            championName = championsData[i].id
            break;
        }
    }
    return { uri: "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/" + championName + ".png" }
}

function getSpellImage(spellId, spellsData){
    let spellName;
    for (var i in spellsData) {
        if (spellsData[i].key == spellId) {
            spellName = spellsData[i].id
            break;
        }
    }
    return { uri: "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/spell/" + spellName + ".png" }
}

function getSpellCooldown(spellId, spellsData){
    let spellCooldown;
    for (var i in spellsData) {
        if (spellsData[i].key == spellId) {
            spellCooldown = spellsData[i].cooldown[0];
        }
    }
    return spellCooldown;
}

function HasCooldownRune(perkIds){
    for(let i in perkIds){
        if(perkIds[i] == 8347){ //ID from Cosmic Insight Rune
            return true
        }
    }
    return false
}

const api = {
    getChampionsData,
    getSpellsData,
    getChampImage,
    getSpellImage,
    getSpellCooldown,
    HasCooldownRune
}

export default api;